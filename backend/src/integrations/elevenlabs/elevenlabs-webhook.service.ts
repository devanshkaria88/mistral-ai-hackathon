import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElevenLabsWebhookDto, WebhookResponseDto } from './dto/webhook.dto';
import { S3Service } from '../s3/s3.service';
import { MistralService, ExtractedStory } from '../mistral/mistral.service';
import { ElevenLabsService } from './elevenlabs.service';
import { AudioExtractionService } from '../audio/audio-extraction.service';
import { StoriesService } from '../../stories/stories.service';
import { Conversation } from '../../conversations/conversation.entity';
import { VoiceProfile } from '../../voice/voice-profile.entity';
import { VoiceQualityTier } from '../../common/types/voice-quality-tier.enum';

// Threshold for triggering voice cloning (30 seconds minimum)
const VOICE_CLONING_THRESHOLD_SECONDS = 30;
// Maximum audio duration for voice cloning (2-3 minutes is optimal per ElevenLabs best practices)
const MAX_VOICE_CLONING_AUDIO_SECONDS = 180; // 3 minutes max

interface AudioSegment {
  key: string;
  durationSeconds: number;
  buffer?: Buffer; // Keep buffer in memory for recent segments
  timestamp: number;
}

interface UserAudioMetadata {
  totalDurationSeconds: number;
  audioSegments: AudioSegment[];
  voiceCloningTriggered: boolean;
  voiceCloneId?: string;
}

@Injectable()
export class ElevenLabsWebhookService {
  private readonly logger = new Logger(ElevenLabsWebhookService.name);

  // Store conversation metadata locally until database is implemented
  private conversationMetadata: Map<string, { audioKey?: string; transcriptKey?: string; userAudioKey?: string }> = new Map();
  
  // Store extracted stories temporarily (for cases where userId is not yet known)
  private pendingStories: Map<string, ExtractedStory[]> = new Map();

  // Track cumulative user audio duration per user (keyed by user_id from dynamic_variables)
  private userAudioTracking: Map<string, UserAudioMetadata> = new Map();

  constructor(
    private readonly s3Service: S3Service,
    private readonly mistralService: MistralService,
    private readonly elevenLabsService: ElevenLabsService,
    private readonly audioExtractionService: AudioExtractionService,
    @Inject(forwardRef(() => StoriesService))
    private readonly storiesService: StoriesService,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(VoiceProfile)
    private readonly voiceProfileRepository: Repository<VoiceProfile>,
  ) {}

  /**
   * Look up userId, conversationId, and mode from ElevenLabs conversation_id
   * by finding the matching conversation in our database via elevenLabsSessionId
   */
  private async getConversationInfo(elevenLabsConversationId: string): Promise<{ 
    userId: string; 
    conversationId: string;
    mode: string;
    personaUserId: string | null;
  } | null> {
    // First try to find by elevenLabsSessionId (exact match)
    const conversation = await this.conversationRepository.findOne({
      where: { elevenLabsSessionId: elevenLabsConversationId },
    });

    if (conversation) {
      return {
        userId: conversation.userId,
        conversationId: conversation.id, // Our internal UUID
        mode: conversation.mode || 'companion',
        personaUserId: conversation.personaUserId || null,
      };
    }

    // If not found, the elevenLabsConversationId might be the actual ElevenLabs conv ID
    // which is different from our internal conversationId
    this.logger.warn(`No conversation found for ElevenLabs ID: ${elevenLabsConversationId}`);
    return null;
  }

  // Backwards compatible helper
  private async getUserIdFromConversation(elevenLabsConversationId: string): Promise<string | null> {
    const info = await this.getConversationInfo(elevenLabsConversationId);
    return info?.userId || null;
  }

  async handlePostCallTranscription(payload: any): Promise<WebhookResponseDto> {
    const conversationId = payload.data?.conversation_id || 'unknown';
    const transcript = payload.data?.transcript || [];
    
    this.logger.log(`Processing post_call_transcription: ${conversationId}`);
    this.logger.log(`Agent ID: ${payload.data?.agent_id}`);
    this.logger.log(`Transcript messages count: ${transcript.length}`);
    this.logger.log(`Call duration: ${payload.data?.metadata?.call_duration_secs}s`);

    let transcriptKey: string | undefined;

    // Convert transcript array to text
    const transcriptText = transcript
      .map((t: any) => `${t.role === 'agent' ? 'Assistant' : 'User'}: ${t.message}`)
      .join('\n');

    // Store transcript if provided
    if (transcriptText && conversationId !== 'unknown') {
      try {
        const uploadResult = await this.s3Service.uploadTranscript(
          transcriptText,
          conversationId,
        );
        transcriptKey = uploadResult.key;
        this.logger.log(`Transcript stored at: ${transcriptKey}`);
      } catch (error) {
        this.logger.error(`Failed to store transcript: ${error.message}`, error.stack);
      }
    }

    // Update metadata with transcript key
    if (conversationId !== 'unknown') {
      const existing = this.conversationMetadata.get(conversationId) || {};
      this.conversationMetadata.set(conversationId, { ...existing, transcriptKey });
    }

    // Extract stories from transcript using Mistral AI (async, don't block response)
    // Only for COMPANION mode - PERSONA mode doesn't need story extraction
    if (transcriptText && conversationId !== 'unknown') {
      const convInfo = await this.getConversationInfo(conversationId);
      if (convInfo) {
        if (convInfo.mode === 'persona') {
          this.logger.log(`Persona mode conversation - skipping story extraction`);
        } else {
          // COMPANION mode: Pass our internal UUID, not the ElevenLabs conversation ID
          this.extractStoriesAsync(convInfo.conversationId, transcriptText, convInfo.userId);
        }
      } else {
        // Fallback: store as pending (will be lost on restart)
        this.extractStoriesAsync(conversationId, transcriptText, undefined);
      }
    }

    this.logger.log(`Post-call transcription processed for conversation ${conversationId}`);

    return {
      success: true,
      message: 'Post-call transcription processed',
      conversationId,
      transcriptKey,
    };
  }

  private async extractStoriesAsync(conversationId: string, transcriptText: string, userId?: string): Promise<void> {
    try {
      this.logger.log(`Starting story extraction for conversation ${conversationId}`);
      
      const stories = await this.mistralService.extractStoriesFromTranscript(transcriptText);
      
      if (stories.length > 0) {
        this.logger.log(`Extracted ${stories.length} stories for conversation ${conversationId}`);
        
        // Log extracted stories
        stories.forEach((story, index) => {
          this.logger.log(`Story ${index + 1}: "${story.title}" - ${story.themes?.join(', ')}`);
        });

        // If we have userId, save directly to database
        if (userId) {
          await this.saveStoriesToDatabase(userId, conversationId, stories);
        } else {
          // Store temporarily until we get userId from audio webhook
          this.pendingStories.set(conversationId, stories);
          this.logger.log(`Stored ${stories.length} pending stories for conversation ${conversationId}`);
        }
      } else {
        this.logger.log(`No stories extracted from conversation ${conversationId}`);
      }
    } catch (error) {
      this.logger.error(`Failed to extract stories: ${error.message}`, error.stack);
    }
  }

  private async saveStoriesToDatabase(userId: string, conversationId: string, stories: ExtractedStory[]): Promise<void> {
    try {
      const savedStories = await this.storiesService.createFromExtracted(userId, conversationId, stories);
      this.logger.log(`✅ Saved ${savedStories.length} stories to database for user ${userId}`);
      
      // Clear pending stories if any
      this.pendingStories.delete(conversationId);
    } catch (error) {
      this.logger.error(`Failed to save stories to database: ${error.message}`, error.stack);
    }
  }

  getExtractedStories(conversationId: string): ExtractedStory[] {
    return this.pendingStories.get(conversationId) || [];
  }

  async handlePostCallAudio(payload: any): Promise<WebhookResponseDto> {
    const conversationId = payload.data?.conversation_id || 'unknown';
    const agentId = payload.data?.agent_id;
    
    // ElevenLabs post_call_audio webhook sends:
    // - data.agent_id: string
    // - data.conversation_id: string  
    // - data.full_audio: Base64-encoded string (complete conversation audio in MP3)
    const fullAudioBase64 = payload.data?.full_audio;
    
    this.logger.log(`Processing post_call_audio: ${conversationId}`);
    this.logger.log(`Agent ID: ${agentId}`);
    this.logger.log(`Has full audio: ${!!fullAudioBase64} (${fullAudioBase64?.length || 0} chars)`);

    let audioKey: string | undefined;

    // Store full conversation audio from base64
    if (fullAudioBase64 && conversationId !== 'unknown') {
      try {
        this.logger.log(`Decoding full audio from base64...`);
        const audioBuffer = Buffer.from(fullAudioBase64, 'base64');
        const audioSizeMB = audioBuffer.length / 1024 / 1024;
        this.logger.log(`Full audio buffer size: ${audioSizeMB.toFixed(2)} MB`);
        
        // Log first 16 bytes for format detection debugging
        const headerBytes = audioBuffer.slice(0, 16).toString('hex');
        this.logger.log(`Audio header bytes: ${headerBytes}`);
        
        // Validate MP3 format
        const isValidMp3 = (
          // ID3 tag
          (audioBuffer[0] === 0x49 && audioBuffer[1] === 0x44 && audioBuffer[2] === 0x33) ||
          // MP3 sync word
          (audioBuffer[0] === 0xFF && (audioBuffer[1] & 0xE0) === 0xE0)
        );
        this.logger.log(`Valid MP3 format: ${isValidMp3}`);
        
        // Estimate duration: MP3 at ~128kbps = ~16KB/sec
        const estimatedDurationSecs = audioBuffer.length / (16 * 1024);
        this.logger.log(`Estimated audio duration: ${estimatedDurationSecs.toFixed(1)}s`);
        
        const uploadResult = await this.s3Service.uploadAudio(
          audioBuffer,
          conversationId,
          'audio/mpeg',
          'full',
        );
        audioKey = uploadResult.key;
        this.logger.log(`Full audio stored at: ${audioKey}`);

        // Get conversation info from our database using the ElevenLabs conversation_id
        // Also fetch conversation details from ElevenLabs for duration info and transcript
        try {
          const conversationDetails = await this.elevenLabsService.getConversation(conversationId);
          const callDurationSecs = conversationDetails.callDurationSecs || estimatedDurationSecs;
          const userSpeakingDurationSecs = conversationDetails.userSpeakingDurationSecs || 0;
          const transcript = conversationDetails.transcript || [];
          
          // Look up conversation info from our database
          const convInfo = await this.getConversationInfo(conversationId);
          const userId = convInfo?.userId;
          const isPersonaMode = convInfo?.mode === 'persona';
          
          this.logger.log(`Conversation details - User ID: ${userId}, Mode: ${convInfo?.mode}, Duration: ${callDurationSecs}s, User speaking: ${userSpeakingDurationSecs}s`);

          if (userId) {
            // For PERSONA mode: just store the audio, no story extraction or voice cloning
            if (isPersonaMode) {
              this.logger.log(`Persona mode conversation - skipping story extraction and voice cloning`);
              // Audio is already stored above, nothing else to do
            } else {
              // COMPANION mode: Extract user audio, trigger voice cloning, save stories
              this.logger.log(`Companion mode - extracting user audio segments from full audio...`);
              const userAudioBuffer = await this.audioExtractionService.extractUserAudio(
                audioBuffer,
                transcript,
                callDurationSecs,
              );

              if (userAudioBuffer) {
                // Upload user-only audio to S3
                const userAudioUpload = await this.s3Service.uploadAudio(
                  userAudioBuffer,
                  conversationId,
                  'audio/mpeg',
                  'user',
                );
                const userAudioKey = userAudioUpload.key;
                this.logger.log(`User audio stored at: ${userAudioKey} (${(userAudioBuffer.length / 1024).toFixed(1)} KB)`);

                // Track user audio for voice cloning (using extracted user-only audio)
                await this.trackUserAudioAndTriggerCloning(
                  userId,
                  userAudioKey,
                  userSpeakingDurationSecs,
                  userAudioBuffer,
                );
              } else {
                this.logger.warn(`Could not extract user audio - using full audio as fallback`);
                await this.trackUserAudioAndTriggerCloning(
                  userId,
                  audioKey,
                  userSpeakingDurationSecs,
                  audioBuffer,
                );
              }

              // Check for pending stories and save them now that we have userId
              const pendingStories = this.pendingStories.get(conversationId);
              if (pendingStories && pendingStories.length > 0) {
                this.logger.log(`Found ${pendingStories.length} pending stories for conversation ${conversationId}, saving to database...`);
                await this.saveStoriesToDatabase(userId, conversationId, pendingStories);
              }
            }
          } else {
            this.logger.warn(`Could not find userId for conversation ${conversationId} - processing skipped`);
          }
        } catch (convError) {
          this.logger.warn(`Could not process conversation details: ${convError.message}`);
        }
      } catch (error) {
        this.logger.error(`Failed to store full audio: ${error.message}`, error.stack);
      }
    } else {
      this.logger.warn(`No full_audio in post_call_audio webhook for conversation ${conversationId}`);
    }

    // Update metadata
    if (conversationId !== 'unknown') {
      const existing = this.conversationMetadata.get(conversationId) || {};
      this.conversationMetadata.set(conversationId, { ...existing, audioKey });
    }

    this.logger.log(`Post-call audio processed for conversation ${conversationId}`);

    return {
      success: true,
      message: 'Post-call audio processed',
      conversationId,
      audioKey,
    };
  }

  private async trackUserAudioAndTriggerCloning(
    userId: string,
    audioKey: string,
    userSpeakingDurationSecs: number,
    audioBuffer: Buffer,
  ): Promise<void> {
    // Get or create voice profile from database (persists across restarts)
    let voiceProfile = await this.voiceProfileRepository.findOne({
      where: { userId },
    });

    if (!voiceProfile) {
      voiceProfile = this.voiceProfileRepository.create({
        userId,
        totalAudioSeconds: 0,
        samplesCount: 0,
        audioSegmentKeys: [],
        qualityTier: VoiceQualityTier.NONE,
      });
    }

    // Use actual user speaking duration if available, otherwise estimate
    const segmentDuration = userSpeakingDurationSecs > 0 
      ? userSpeakingDurationSecs 
      : (audioBuffer.length / (16 * 1024)) * 0.4; // Estimate 40% of total as user speech
    
    // Add new segment to the list
    const segments = voiceProfile.audioSegmentKeys || [];
    segments.push({
      key: audioKey,
      durationSeconds: segmentDuration,
      timestamp: Date.now(),
    });

    // Update total duration
    voiceProfile.totalAudioSeconds += segmentDuration;
    voiceProfile.samplesCount = segments.length;

    this.logger.log(`User ${userId} added segment: ${segmentDuration.toFixed(1)}s, total: ${voiceProfile.totalAudioSeconds.toFixed(1)}s`);

    // Trim old segments if we exceed 10 minutes, keeping the most recent
    while (voiceProfile.totalAudioSeconds > MAX_VOICE_CLONING_AUDIO_SECONDS && segments.length > 1) {
      const removed = segments.shift();
      if (removed) {
        voiceProfile.totalAudioSeconds -= removed.durationSeconds;
        this.logger.log(`Trimmed old segment (${removed.durationSeconds.toFixed(1)}s), new total: ${voiceProfile.totalAudioSeconds.toFixed(1)}s`);
      }
    }

    voiceProfile.audioSegmentKeys = segments;
    voiceProfile.lastUpdatedAt = new Date();

    this.logger.log(`User ${userId} cumulative audio: ${voiceProfile.totalAudioSeconds.toFixed(1)}s (threshold: ${VOICE_CLONING_THRESHOLD_SECONDS}s, max: ${MAX_VOICE_CLONING_AUDIO_SECONDS}s)`);

    // Check if we've crossed the threshold - trigger cloning or re-cloning
    const shouldClone = voiceProfile.totalAudioSeconds >= VOICE_CLONING_THRESHOLD_SECONDS;
    const hasExistingClone = !!voiceProfile.elevenLabsVoiceId;
    
    if (shouldClone) {
      if (!hasExistingClone) {
        this.logger.log(`🎤 Voice cloning threshold reached for user ${userId}! Triggering initial voice cloning...`);
      } else {
        this.logger.log(`🔄 Re-cloning voice for user ${userId} with updated audio (${segments.length} segments)...`);
      }
      
      // Store current buffer in memory for cloning (will be used immediately)
      const memorySegments: AudioSegment[] = segments.map(s => ({
        key: s.key,
        durationSeconds: s.durationSeconds,
        timestamp: s.timestamp,
        buffer: s.key === audioKey ? audioBuffer : undefined, // Only current segment has buffer
      }));

      // Trigger voice cloning asynchronously
      this.triggerVoiceCloningAsync(userId, memorySegments, voiceProfile.elevenLabsVoiceId || undefined);
    }

    // Save to database
    await this.voiceProfileRepository.save(voiceProfile);
  }

  private async triggerVoiceCloningAsync(
    userId: string,
    audioSegments: AudioSegment[],
    oldVoiceId?: string,
  ): Promise<void> {
    try {
      this.logger.log(`Starting voice cloning for user ${userId} with ${audioSegments.length} audio segments`);
      
      // Collect audio buffers from segments (use in-memory buffers or download from S3)
      const audioBuffers: Buffer[] = [];
      for (const segment of audioSegments) {
        if (segment.buffer) {
          audioBuffers.push(segment.buffer);
        } else if (segment.key) {
          // Download from S3 if buffer not in memory
          try {
            this.logger.log(`Downloading segment from S3: ${segment.key}`);
            const buffer = await this.s3Service.downloadFile(segment.key);
            if (buffer) {
              audioBuffers.push(buffer);
            }
          } catch (downloadError) {
            this.logger.warn(`Failed to download segment ${segment.key}: ${downloadError.message}`);
          }
        }
      }

      if (audioBuffers.length === 0) {
        this.logger.error(`No audio buffers available for voice cloning user ${userId}`);
        return;
      }

      this.logger.log(`Cloning voice with ${audioBuffers.length} audio buffers`);

      // Create new voice clone with all available audio samples
      const startTime = Date.now();
      const newVoiceId = await this.elevenLabsService.createInstantVoiceClone(
        audioBuffers,
        `MemoryVault_User_${userId}`,
        `Voice clone for MemoryVault user ${userId} - ${new Date().toISOString()}`,
      );
      const elapsedMs = Date.now() - startTime;
      this.logger.log(`⏱️ Voice clone API call took ${(elapsedMs / 1000).toFixed(1)}s`);

      if (newVoiceId) {
        // Delete old voice if this is a re-clone
        if (oldVoiceId) {
          this.logger.log(`Deleting old voice clone: ${oldVoiceId}`);
          const deleted = await this.elevenLabsService.deleteVoice(oldVoiceId);
          if (deleted) {
            this.logger.log(`✅ Old voice ${oldVoiceId} deleted successfully`);
          } else {
            this.logger.warn(`⚠️ Could not delete old voice ${oldVoiceId}`);
          }
        }

        // Update voice profile in database with new voice ID
        await this.voiceProfileRepository.update(
          { userId },
          { 
            elevenLabsVoiceId: newVoiceId,
            qualityTier: this.calculateQualityTier(audioBuffers.length),
            lastUpdatedAt: new Date(),
          },
        );
        
        this.logger.log(`✅ Voice clone ${oldVoiceId ? 'updated' : 'created'} for user ${userId}: ${newVoiceId}`);
      }
    } catch (error) {
      this.logger.error(`Failed to create voice clone for user ${userId}: ${error.message}`, error.stack);
    }
  }

  private calculateQualityTier(samplesCount: number): VoiceQualityTier {
    if (samplesCount >= 10) return VoiceQualityTier.EXCELLENT;
    if (samplesCount >= 5) return VoiceQualityTier.GOOD;
    if (samplesCount >= 3) return VoiceQualityTier.BASIC;
    return VoiceQualityTier.NONE;
  }

  getUserVoiceCloneId(userId: string): string | undefined {
    return this.userAudioTracking.get(userId)?.voiceCloneId;
  }

  getUserAudioStats(userId: string): UserAudioMetadata | undefined {
    return this.userAudioTracking.get(userId);
  }

  /**
   * Process a conversation by fetching it directly from ElevenLabs API
   * This can be used to manually trigger the pipeline for a specific conversation
   */
  async processConversationById(conversationId: string, userId: string): Promise<WebhookResponseDto> {
    this.logger.log(`Processing conversation ${conversationId} for user ${userId} via API fetch`);

    try {
      // Fetch conversation details from ElevenLabs
      const conversation = await this.elevenLabsService.getConversation(conversationId);
      
      this.logger.log(`Fetched conversation: ${conversation.status}, ${conversation.transcript.length} messages, ${conversation.callDurationSecs}s`);

      // Convert transcript to text format
      const transcriptText = conversation.transcript
        .map((t) => `${t.role === 'agent' ? 'Assistant' : 'User'}: ${t.message}`)
        .join('\n');

      // Store transcript to S3
      let transcriptKey: string | undefined;
      if (transcriptText) {
        const uploadResult = await this.s3Service.uploadTranscript(transcriptText, conversationId);
        transcriptKey = uploadResult.key;
        this.logger.log(`Transcript stored at: ${transcriptKey}`);
      }

      // Extract stories from transcript
      if (transcriptText) {
        this.extractStoriesAsync(conversationId, transcriptText);
      }

      // Fetch and store audio
      let audioKey: string | undefined;
      try {
        const audioBuffer = await this.elevenLabsService.getConversationAudio(conversationId);
        const uploadResult = await this.s3Service.uploadAudio(audioBuffer, conversationId, 'audio/mpeg', 'full');
        audioKey = uploadResult.key;
        this.logger.log(`Audio stored at: ${audioKey}`);

        // Estimate duration from audio size if API doesn't provide it
        // MP3 at ~128kbps = ~16KB/sec
        const estimatedDuration = conversation.callDurationSecs > 0 
          ? conversation.callDurationSecs 
          : audioBuffer.length / (16 * 1024);
        
        this.logger.log(`Audio duration: ${estimatedDuration.toFixed(1)}s (estimated from ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

        // Track user audio for voice cloning
        await this.trackUserAudioAndTriggerCloning(userId, audioKey, estimatedDuration, audioBuffer);
      } catch (audioError) {
        this.logger.warn(`Could not fetch audio: ${audioError.message}`);
      }

      // Update metadata
      const existing = this.conversationMetadata.get(conversationId) || {};
      this.conversationMetadata.set(conversationId, { ...existing, transcriptKey, audioKey });

      return {
        success: true,
        message: `Conversation ${conversationId} processed successfully`,
        conversationId,
        transcriptKey,
      };
    } catch (error) {
      this.logger.error(`Failed to process conversation ${conversationId}: ${error.message}`, error.stack);
      return {
        success: false,
        message: `Failed to process conversation: ${error.message}`,
        conversationId,
      };
    }
  }

  async handleConversationEnded(payload: ElevenLabsWebhookDto): Promise<WebhookResponseDto> {
    const conversationId = payload.conversation_id || 'unknown';
    
    this.logger.log(`Processing conversation ended: ${conversationId}`);
    this.logger.log(`Agent ID: ${payload.agent_id}`);
    this.logger.log(`Audio URL: ${payload.audio_url}`);
    this.logger.log(`Transcript messages count: ${payload.transcript?.length || 0}`);
    this.logger.log(`Metadata: ${JSON.stringify(payload.metadata)}`);

    let audioKey: string | undefined;
    let transcriptKey: string | undefined;

    // Download and store audio if URL is provided
    if (payload.audio_url && conversationId !== 'unknown') {
      try {
        this.logger.log(`Downloading audio from: ${payload.audio_url}`);
        const audioBuffer = await this.s3Service.downloadAudioFromUrl(payload.audio_url);
        
        const uploadResult = await this.s3Service.uploadAudio(
          audioBuffer,
          conversationId,
        );
        audioKey = uploadResult.key;
        this.logger.log(`Audio stored at: ${audioKey}`);
      } catch (error) {
        this.logger.error(`Failed to store audio: ${error.message}`, error.stack);
      }
    }

    // Store transcript if provided
    if ((payload.transcript_text || payload.transcript) && conversationId !== 'unknown') {
      try {
        const transcriptText = payload.transcript_text || 
          this.formatTranscript(payload.transcript || []);
        
        const uploadResult = await this.s3Service.uploadTranscript(
          transcriptText,
          conversationId,
        );
        transcriptKey = uploadResult.key;
        this.logger.log(`Transcript stored at: ${transcriptKey}`);
      } catch (error) {
        this.logger.error(`Failed to store transcript: ${error.message}`, error.stack);
      }
    }

    // Store metadata locally (TODO: save to database)
    if (conversationId !== 'unknown') {
      this.conversationMetadata.set(conversationId, { audioKey, transcriptKey });
    }

    // TODO: Trigger story extraction pipeline with Mistral

    this.logger.log(`Conversation ${payload.conversation_id} processed successfully`);

    return {
      success: true,
      message: 'Conversation ended event processed',
      conversationId: payload.conversation_id,
      audioKey,
      transcriptKey,
    };
  }

  private formatTranscript(messages: { role: string; message: string }[]): string {
    return messages
      .map((m) => `${m.role}: ${m.message}`)
      .join('\n\n');
  }

  async getAudioPresignedUrl(audioKey: string): Promise<{ url: string; expiresAt: Date }> {
    return this.s3Service.getPresignedDownloadUrl(audioKey);
  }

  async getTranscriptPresignedUrl(transcriptKey: string): Promise<{ url: string; expiresAt: Date }> {
    return this.s3Service.getPresignedDownloadUrl(transcriptKey);
  }

  getConversationMetadata(conversationId: string): { audioKey?: string; transcriptKey?: string } | undefined {
    return this.conversationMetadata.get(conversationId);
  }
}
