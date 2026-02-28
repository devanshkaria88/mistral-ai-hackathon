import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConversationStatus } from '../common/types/conversation-status.enum';
import {
  StartConversationDto,
  ConversationMode,
  StartConversationResponseDto,
  EndConversationResponseDto,
  ConversationResponseDto,
} from './dto';
import { ElevenLabsService, AgentType, CompanionAgentConfig, PersonaAgentConfig } from '../integrations/elevenlabs/elevenlabs.service';

@Injectable()
export class ConversationsService {
  private readonly logger = new Logger(ConversationsService.name);

  constructor(
    private readonly elevenLabsService: ElevenLabsService,
  ) {}

  // TODO: Implement with real database, user lookup, and story retrieval
  async startConversation(
    userId: string,
    dto: StartConversationDto,
  ): Promise<StartConversationResponseDto> {
    this.logger.log(`Starting ${dto.mode} conversation for user: ${userId}`);

    // Validate persona mode requires elderlyUserId
    if (dto.mode === ConversationMode.PERSONA && !dto.elderlyUserId) {
      throw new BadRequestException('elderlyUserId is required for persona mode');
    }

    let session;
    const conversationId = uuidv4();

    if (dto.mode === ConversationMode.COMPANION) {
      // Companion mode: elderly user talking to Evie
      // TODO: Fetch user profile, previous stories, and generate exploration suggestions
      const config: CompanionAgentConfig = {
        type: AgentType.COMPANION,
        dynamicVariables: {
          user_name: 'Margaret', // TODO: Get from user profile
          user_age: '82', // TODO: Get from user profile
          context_block: 'Margaret lives in Devon. She was a teacher for 30 years. She has two children, Sarah and Tom.',
          stories_summary: 'Previously shared: Meeting Arthur at the dance hall (1962), Wedding day (1964)',
          exploration_suggestions: 'Ask about: Teaching career, Childhood in Devon, Her mother',
        },
        firstMessage: "Hello Margaret! It's lovely to talk with you again. How are you feeling today?",
      };
      session = await this.elevenLabsService.createCompanionSession(config);
    } else {
      // Persona mode: family member talking to elderly person's persona
      // TODO: Fetch elderly user's voice profile, stories, personality, people
      const config: PersonaAgentConfig = {
        type: AgentType.PERSONA,
        dynamicVariables: {
          elderly_name: 'Margaret', // TODO: Get from elderly user profile
          personality_block: 'Warm, gentle, quietly witty. Gets emotional about Arthur but always positive.',
          stories_block: 'Story 1: Met Arthur at Palais dance hall, 1962...\nStory 2: Wedding day, 1964...',
          people_block: 'Arthur (husband, deceased), Sarah (daughter), Tom (son), Betty (best friend)',
          speech_patterns: 'Uses "love" and "dear". Says "well, I never" and "isn\'t that something"',
        },
        clonedVoiceId: 'voice_clone_abc123', // TODO: Get from VoiceProfile table
        firstMessage: "Hello love! It's so wonderful to hear from you. What would you like to know?",
      };
      session = await this.elevenLabsService.createPersonaSession(config);
    }

    // TODO: Save conversation to database with session info
    
    return {
      conversationId,
      sessionUrl: session.sessionUrl,
    };
  }

  // TODO: Implement with real database
  async endConversation(conversationId: string): Promise<EndConversationResponseDto> {
    this.logger.log(`Ending conversation: ${conversationId}`);
    
    return {
      status: 'processing',
    };
  }

  // TODO: Implement with real database
  async findAll(userId: string): Promise<ConversationResponseDto[]> {
    this.logger.log(`Fetching conversations for user: ${userId}`);
    
    // Mock data - Margaret's conversations
    return [
      {
        id: uuidv4(),
        userId,
        status: ConversationStatus.PROCESSED,
        transcript: "Margaret: Let me tell you about when I met Arthur...",
        audioUrl: 'https://storage.example.com/audio/conv1.mp3',
        createdAt: new Date('2026-02-27T10:00:00Z'),
        updatedAt: new Date('2026-02-27T10:30:00Z'),
        storiesCount: 2,
      },
      {
        id: uuidv4(),
        userId,
        status: ConversationStatus.PROCESSED,
        transcript: "Margaret: Sarah was born on a beautiful spring morning...",
        audioUrl: 'https://storage.example.com/audio/conv2.mp3',
        createdAt: new Date('2026-02-26T14:00:00Z'),
        updatedAt: new Date('2026-02-26T14:45:00Z'),
        storiesCount: 1,
      },
    ];
  }

  // TODO: Implement with real database
  async findOne(conversationId: string): Promise<ConversationResponseDto> {
    this.logger.log(`Fetching conversation: ${conversationId}`);
    
    return {
      id: conversationId,
      userId: uuidv4(),
      status: ConversationStatus.PROCESSED,
      transcript: "Margaret: Let me tell you about when I met Arthur. It was 1962, at the Palais dance hall...",
      audioUrl: 'https://storage.example.com/audio/conv1.mp3',
      createdAt: new Date('2026-02-27T10:00:00Z'),
      updatedAt: new Date('2026-02-27T10:30:00Z'),
      storiesCount: 2,
    };
  }
}
