import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ConversationStatus } from '../common/types/conversation-status.enum';
import {
  StartConversationDto,
  ConversationMode,
  StartConversationResponseDto,
  EndConversationResponseDto,
  ConversationResponseDto,
  PresignedUrlResponseDto,
} from './dto';
import { Conversation, ConversationMode as ConversationModeEntity } from './conversation.entity';
import { ElevenLabsService, AgentType, CompanionAgentConfig, PersonaAgentConfig } from '../integrations/elevenlabs/elevenlabs.service';
import { ElevenLabsWebhookService } from '../integrations/elevenlabs/elevenlabs-webhook.service';
import { S3Service } from '../integrations/s3/s3.service';
import { UsersService } from '../users/users.service';
import { StoriesService } from '../stories/stories.service';
import { VoiceService } from '../voice/voice.service';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private readonly elevenLabsService: ElevenLabsService,
    private readonly elevenLabsWebhookService: ElevenLabsWebhookService,
    private readonly s3Service: S3Service,
    private readonly usersService: UsersService,
    private readonly storiesService: StoriesService,
    private readonly voiceService: VoiceService,
  ) {}

  private toResponseDto(conversation: Conversation, storiesCount: number = 0): ConversationResponseDto {
    return {
      id: conversation.id,
      userId: conversation.userId,
      status: conversation.status,
      transcript: conversation.transcript,
      audioUrl: conversation.audioUrl,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
      storiesCount,
    };
  }

  async startConversation(
    userId: string,
    dto: StartConversationDto,
  ): Promise<StartConversationResponseDto> {
    this.logger.log(`Starting ${dto.mode} conversation for user: ${userId}`);

    // Validate persona mode requires elderlyUserId
    if (dto.mode === ConversationMode.PERSONA && !dto.elderlyUserId) {
      throw new BadRequestException('elderlyUserId is required for persona mode');
    }

    // Fetch real user data from database
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch user's previous stories with full context for knowledge graph
    const userStories = await this.storiesService.findAllWithRelations(userId);
    
    // Build rich context from stories
    const { storiesSummary, contextBlock, explorationSuggestions } = this.buildKnowledgeContext(userStories, user.displayName);

    let session;

    // Build dynamic variables for the agent prompt using REAL user data
    const dynamicVariables = {
      user_name: user.displayName,
      user_age: '', // Age not stored in user profile yet
      context_block: contextBlock,
      stories_summary: storiesSummary,
      exploration_suggestions: explorationSuggestions,
    };

    this.logger.log(`Dynamic variables for ${user.displayName}: ${JSON.stringify(dynamicVariables)}`);

    if (dto.mode === ConversationMode.COMPANION) {
      // Companion mode: elderly user talking to Evie
      const config: CompanionAgentConfig = {
        type: AgentType.COMPANION,
        dynamicVariables,
        firstMessage: `Hello ${dynamicVariables.user_name}! It's lovely to talk with you. How are you feeling today?`,
      };
      session = await this.elevenLabsService.createCompanionSession(config);
    } else {
      // Persona mode: family member talking to elderly person's persona
      const elderlyUser = await this.usersService.findById(dto.elderlyUserId!);
      if (!elderlyUser) {
        throw new NotFoundException('Elderly user not found');
      }

      // Fetch elderly user's stories with full content for the persona
      const elderlyStories = await this.storiesService.findAllWithRelations(dto.elderlyUserId!);
      
      // Build knowledge graph - structured memory format for the virtual clone
      const knowledgeGraph = this.buildPersonaKnowledgeGraph(elderlyStories, elderlyUser.displayName);

      // Build people block with relationships and context
      const peopleMap = new Map<string, { relationship: string; stories: string[] }>();
      elderlyStories.forEach(s => {
        s.people?.forEach(p => {
          if (!peopleMap.has(p.name)) {
            peopleMap.set(p.name, { relationship: p.relationship || 'mentioned', stories: [] });
          }
          peopleMap.get(p.name)!.stories.push(s.title);
        });
      });
      const peopleBlock = peopleMap.size > 0 
        ? Array.from(peopleMap.entries()).map(([name, info]) => 
            `- ${name} (${info.relationship}): Mentioned in "${info.stories.join('", "')}"`)
          .join('\n')
        : 'No specific people mentioned in memories yet.';

      // Build personality block from emotional tones and themes
      const emotionalTones = [...new Set(elderlyStories.map(s => s.emotionalTone).filter(Boolean))];
      const allThemes = [...new Set(elderlyStories.flatMap(s => s.themes?.map(t => t.name) || []))];
      
      let personalityBlock = `${elderlyUser.displayName} is `;
      if (emotionalTones.length > 0) {
        personalityBlock += `${emotionalTones.slice(0, 3).join(', ')}. `;
      } else {
        personalityBlock += 'warm, loving, and thoughtful. ';
      }
      if (allThemes.length > 0) {
        personalityBlock += `Their stories often touch on themes of ${allThemes.slice(0, 5).join(', ')}. `;
      }
      personalityBlock += 'They speak with genuine affection and enjoy sharing memories with family.';

      // Build speech patterns from story content analysis
      const speechPatterns = `Speaks naturally and warmly. Uses phrases like "I remember when...", "That reminds me of...", "Your grandfather/grandmother always said...". Comfortable with pauses and reflection. May get emotional when discussing meaningful memories.`;

      // Fetch voice profile for the elderly user
      const voiceProfile = await this.voiceService.findByUserId(dto.elderlyUserId!);
      const clonedVoiceId = voiceProfile?.elevenLabsVoiceId || null;
      
      if (!clonedVoiceId) {
        this.logger.warn(`No voice clone available for user ${dto.elderlyUserId} - using default voice`);
      }

      // Build persona dynamic variables matching the new "virtual clone" system prompt
      const personaDynamicVars = {
        elderly_name: elderlyUser.displayName,
        personality_block: personalityBlock,
        knowledge_graph: knowledgeGraph,
        people_block: peopleBlock,
        speech_patterns: speechPatterns,
      };

      this.logger.log(`Persona knowledge graph for ${elderlyUser.displayName}: ${elderlyStories.length} memories, ${peopleMap.size} people, ${allThemes.length} themes`);

      const config: PersonaAgentConfig = {
        type: AgentType.PERSONA,
        dynamicVariables: personaDynamicVars,
        clonedVoiceId: clonedVoiceId,
        firstMessage: `Hello! It's so wonderful to hear from you. What would you like to talk about?`,
      };
      session = await this.elevenLabsService.createPersonaSession(config);

      // Return persona-specific dynamic variables that match the persona agent's system prompt
      // These will be passed by the Flutter SDK to ElevenLabs
      (dynamicVariables as any).elderly_name = personaDynamicVars.elderly_name;
      (dynamicVariables as any).personality_block = personaDynamicVars.personality_block;
      (dynamicVariables as any).knowledge_graph = personaDynamicVars.knowledge_graph;
      (dynamicVariables as any).people_block = personaDynamicVars.people_block;
      (dynamicVariables as any).speech_patterns = personaDynamicVars.speech_patterns;
      
      // Also set companion-mode keys for mobile app display compatibility
      dynamicVariables.user_name = elderlyUser.displayName;
      dynamicVariables.context_block = `Speaking with ${elderlyUser.displayName}'s memory persona`;
      dynamicVariables.stories_summary = `${elderlyStories.length} stories available`;
      dynamicVariables.exploration_suggestions = 'Ask about their memories, family, or life experiences.';
    }

    // Save conversation to database
    const conversation = this.conversationRepository.create({
      userId,
      mode: dto.mode === ConversationMode.PERSONA ? ConversationModeEntity.PERSONA : ConversationModeEntity.COMPANION,
      personaUserId: dto.elderlyUserId || null,
      elevenLabsSessionId: session.conversationId,
      status: ConversationStatus.ACTIVE,
      metadata: {
        mode: dto.mode,
        elderlyUserId: dto.elderlyUserId,
      },
    });
    const savedConversation = await this.conversationRepository.save(conversation);
    this.logger.log(`Created conversation: ${savedConversation.id}`);
    
    return {
      conversationId: savedConversation.id,
      conversationToken: session.conversationToken,
      dynamicVariables,
    };
  }

  async endConversation(conversationId: string): Promise<EndConversationResponseDto> {
    this.logger.log(`Ending conversation: ${conversationId}`);
    
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} not found`);
    }

    conversation.status = ConversationStatus.PROCESSING;
    await this.conversationRepository.save(conversation);
    
    return {
      status: 'processing',
    };
  }

  /**
   * Update the ElevenLabs conversation ID for a conversation.
   * Called by mobile app when the ElevenLabs session connects and returns the real conversation ID.
   */
  async updateElevenLabsId(conversationId: string, elevenLabsConversationId: string): Promise<void> {
    this.logger.log(`Updating ElevenLabs ID for conversation ${conversationId}: ${elevenLabsConversationId}`);
    
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} not found`);
    }

    conversation.elevenLabsSessionId = elevenLabsConversationId;
    await this.conversationRepository.save(conversation);
    
    this.logger.log(`Updated ElevenLabs ID for conversation ${conversationId}`);
  }

  async findAll(userId: string): Promise<ConversationResponseDto[]> {
    this.logger.log(`Fetching conversations for user: ${userId}`);
    
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.stories', 'stories')
      .addSelect('COUNT(stories.id)', 'storiesCount')
      .where('conversation.userId = :userId', { userId })
      .andWhere('conversation.deletedAt IS NULL')
      .andWhere('conversation.mode = :mode', { mode: 'companion' }) // Only companion mode for main conversations list
      .groupBy('conversation.id')
      .orderBy('conversation.createdAt', 'DESC')
      .getRawAndEntities();

    return conversations.entities.map((conv, index) => {
      const raw = conversations.raw[index];
      return this.toResponseDto(conv, parseInt(raw.storiesCount || '0', 10));
    });
  }

  /**
   * Find all persona conversations where the caller talked to a specific family member's persona
   */
  async findPersonaConversations(callerId: string, personaUserId: string): Promise<ConversationResponseDto[]> {
    this.logger.log(`Fetching persona conversations for caller: ${callerId}, persona: ${personaUserId}`);
    
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversation')
      .where('conversation.userId = :callerId', { callerId })
      .andWhere('conversation.personaUserId = :personaUserId', { personaUserId })
      .andWhere('conversation.mode = :mode', { mode: 'persona' })
      .andWhere('conversation.deletedAt IS NULL')
      .orderBy('conversation.createdAt', 'DESC')
      .getMany();

    return conversations.map(conv => this.toResponseDto(conv, 0));
  }

  async findOne(conversationId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Fetching conversation: ${conversationId}`);
    
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId, deletedAt: null as any },
      relations: ['stories', 'stories.themes', 'stories.people', 'stories.places'],
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} not found`);
    }

    const stories = (conversation.stories || []).map(story => ({
      id: story.id,
      title: story.title,
      content: story.content,
      timePeriod: story.timePeriod,
      emotionalTone: story.emotionalTone,
      themes: (story.themes || []).map(t => ({ id: t.id, name: t.name, slug: t.slug })),
      people: (story.people || []).map(p => ({ id: p.id, name: p.name, relationship: p.relationship })),
      places: (story.places || []).map(p => ({ id: p.id, name: p.name, description: p.description })),
    }));
    
    const response = this.toResponseDto(conversation, stories.length);
    response.stories = stories;

    // Try to get audio presigned URL
    try {
      const metadata = this.elevenLabsWebhookService.getConversationMetadata(conversationId);
      if (metadata?.audioKey) {
        const audioResult = await this.s3Service.getPresignedDownloadUrl(metadata.audioKey, 3600);
        response.recordingUrl = audioResult.url;
      }
    } catch (e) {
      this.logger.debug(`No audio available for conversation ${conversationId}`);
    }

    return response;
  }

  async getAudioPresignedUrl(conversationId: string): Promise<PresignedUrlResponseDto> {
    this.logger.log(`Getting audio presigned URL for conversation: ${conversationId}`);

    const metadata = this.elevenLabsWebhookService.getConversationMetadata(conversationId);
    if (!metadata?.audioKey) {
      throw new NotFoundException(`Audio not found for conversation ${conversationId}`);
    }

    const result = await this.s3Service.getPresignedDownloadUrl(metadata.audioKey);
    return {
      url: result.url,
      expiresAt: result.expiresAt,
    };
  }

  async getTranscriptPresignedUrl(conversationId: string): Promise<PresignedUrlResponseDto> {
    this.logger.log(`Getting transcript presigned URL for conversation: ${conversationId}`);

    const metadata = this.elevenLabsWebhookService.getConversationMetadata(conversationId);
    if (!metadata?.transcriptKey) {
      throw new NotFoundException(`Transcript not found for conversation ${conversationId}`);
    }

    const result = await this.s3Service.getPresignedDownloadUrl(metadata.transcriptKey);
    return {
      url: result.url,
      expiresAt: result.expiresAt,
    };
  }

  async deleteConversation(userId: string, conversationId: string): Promise<void> {
    this.logger.log(`Deleting conversation ${conversationId} for user ${userId}`);

    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId, userId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} not found`);
    }

    // Soft delete the conversation
    await this.conversationRepository.softDelete(conversationId);
    this.logger.log(`Conversation ${conversationId} deleted successfully`);
  }

  private buildKnowledgeContext(stories: any[], userName: string): {
    storiesSummary: string;
    contextBlock: string;
    explorationSuggestions: string;
  } {
    if (stories.length === 0) {
      return {
        storiesSummary: 'No stories shared yet - this is a new conversation.',
        contextBlock: `${userName} is sharing their life stories for the first time.`,
        explorationSuggestions: 'Ask about: Early childhood, Family members, School days, First job, Marriage, Children',
      };
    }

    // Extract all unique people, places, themes, and time periods
    const allPeople = new Map<string, { name: string; relationship: string; count: number }>();
    const allPlaces = new Set<string>();
    const allThemes = new Set<string>();
    const timePeriods = new Set<string>();

    for (const story of stories) {
      // Collect people
      for (const person of story.people || []) {
        const key = person.name.toLowerCase();
        if (allPeople.has(key)) {
          allPeople.get(key)!.count++;
        } else {
          allPeople.set(key, { name: person.name, relationship: person.relationship || '', count: 1 });
        }
      }
      // Collect places
      for (const place of story.places || []) {
        allPlaces.add(place.name);
      }
      // Collect themes
      for (const theme of story.themes || []) {
        allThemes.add(theme.name);
      }
      // Collect time periods
      if (story.timePeriod) {
        timePeriods.add(story.timePeriod);
      }
    }

    // Build FULL stories with complete content (up to 10 most recent)
    const fullStories = stories.slice(0, 10).map((s, i) => {
      const people = (s.people || []).map(p => p.relationship ? `${p.name} (${p.relationship})` : p.name).join(', ');
      const places = (s.places || []).map(p => p.name).join(', ');
      const themes = (s.themes || []).map(t => t.name).join(', ');
      
      return `STORY ${i + 1}: "${s.title}"
Time Period: ${s.timePeriod || 'Unknown'}
Emotional Tone: ${s.emotionalTone || 'Not specified'}
People Involved: ${people || 'None mentioned'}
Places: ${places || 'None mentioned'}
Themes: ${themes || 'None'}
Full Content: ${s.content || 'No content'}
---`;
    });

    // Build people context with relationships
    const peopleList = Array.from(allPeople.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
      .map(p => p.relationship ? `${p.name} (${p.relationship}, mentioned ${p.count}x)` : `${p.name} (mentioned ${p.count}x)`);

    // Build comprehensive context block (knowledge graph summary)
    const contextParts: string[] = [
      `=== KNOWLEDGE GRAPH FOR ${userName.toUpperCase()} ===`,
      `Total Stories Collected: ${stories.length}`,
      '',
      `KEY PEOPLE IN ${userName}'s LIFE:`,
      peopleList.length > 0 ? peopleList.join('\n') : 'No people mentioned yet',
      '',
      `PLACES MENTIONED:`,
      allPlaces.size > 0 ? Array.from(allPlaces).join(', ') : 'No places mentioned yet',
      '',
      `LIFE THEMES:`,
      allThemes.size > 0 ? Array.from(allThemes).join(', ') : 'No themes identified yet',
      '',
      `TIME PERIODS COVERED:`,
      timePeriods.size > 0 ? Array.from(timePeriods).join(', ') : 'No specific time periods mentioned',
    ];

    // Build exploration suggestions based on what's NOT covered
    const coveredThemes = Array.from(allThemes).map(t => t.toLowerCase());
    const suggestedTopics: string[] = [];
    
    const potentialTopics = [
      'Childhood memories', 'School days', 'First love', 'Wedding day', 
      'Career milestones', 'Parenting moments', 'Travel adventures',
      'Holiday traditions', 'Life lessons', 'Proudest achievements',
      'Favorite recipes', 'Musical memories', 'Friendships'
    ];
    
    for (const topic of potentialTopics) {
      if (!coveredThemes.some(t => topic.toLowerCase().includes(t))) {
        suggestedTopics.push(topic);
        if (suggestedTopics.length >= 5) break;
      }
    }

    return {
      storiesSummary: `=== COMPLETE STORIES ===\n\n${fullStories.join('\n\n')}`,
      contextBlock: contextParts.join('\n'),
      explorationSuggestions: suggestedTopics.length > 0 
        ? `Topics to explore next: ${suggestedTopics.join(', ')}`
        : 'Continue exploring their rich life experiences',
    };
  }

  /**
   * Build a structured knowledge graph for the persona virtual clone
   * This creates a memory structure that the persona can draw from naturally
   */
  private buildPersonaKnowledgeGraph(stories: any[], elderlyName: string): string {
    if (stories.length === 0) {
      return `${elderlyName} hasn't shared any memories yet. You can still be warm and present, but acknowledge that you're still learning about their life.`;
    }

    const memoryBlocks: string[] = [];

    // Group stories by time period for chronological context
    const byTimePeriod = new Map<string, any[]>();
    stories.forEach(s => {
      const period = s.timePeriod || 'Various times';
      if (!byTimePeriod.has(period)) {
        byTimePeriod.set(period, []);
      }
      byTimePeriod.get(period)!.push(s);
    });

    // Build memory blocks for each story
    stories.forEach((story, i) => {
      const people = (story.people || []).map((p: any) => 
        p.relationship ? `${p.name} (${p.relationship})` : p.name
      ).join(', ');
      
      const places = (story.places || []).map((p: any) => p.name).join(', ');
      const themes = (story.themes || []).map((t: any) => t.name).join(', ');

      memoryBlocks.push(`
## Memory ${i + 1}: "${story.title}"
**When:** ${story.timePeriod || 'A time I remember well'}
**Emotional feeling:** ${story.emotionalTone || 'Meaningful'}
**People involved:** ${people || 'Just me'}
**Places:** ${places || 'Somewhere special'}
**What I remember:**
${story.content || 'This memory is still forming...'}
**Themes:** ${themes || 'Life moments'}
`);
    });

    // Build the complete knowledge graph
    const knowledgeGraph = `
# ${elderlyName}'s Memories

You have ${stories.length} memories to draw from. These are YOUR memories - speak about them in first person as if you lived them (because you did).

${memoryBlocks.join('\n---\n')}

# How to Use These Memories
- When someone asks about a topic, naturally recall the relevant memory
- Don't list memories - weave them into conversation
- If a memory is emotional, let that emotion come through
- Connect memories to each other when relevant ("That reminds me of another time...")
- If asked about something not in your memories, say you don't recall talking about that
`;

    return knowledgeGraph;
  }
}
