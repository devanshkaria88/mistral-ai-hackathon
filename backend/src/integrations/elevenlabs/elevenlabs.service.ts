import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export interface ConversationSession {
  conversationId: string;
  conversationToken: string;
}

export interface TranscriptResult {
  transcript: string;
  audioUrl: string;
}

export enum AgentType {
  COMPANION = 'companion',
  PERSONA = 'persona',
}

export interface CompanionDynamicVariables {
  user_name: string;
  user_age: string;
  context_block: string;
  stories_summary: string;
  exploration_suggestions: string;
}

export interface PersonaDynamicVariables {
  elderly_name: string;
  personality_block: string;
  knowledge_graph: string; // Structured memory format for the virtual clone
  people_block: string;
  speech_patterns: string;
}

export interface CompanionAgentConfig {
  type: AgentType.COMPANION;
  dynamicVariables: CompanionDynamicVariables;
  firstMessage: string;
}

export interface PersonaAgentConfig {
  type: AgentType.PERSONA;
  dynamicVariables: PersonaDynamicVariables;
  clonedVoiceId: string | null;
  firstMessage: string;
}

export type AgentConfig = CompanionAgentConfig | PersonaAgentConfig;

@Injectable()
export class ElevenLabsService {
  private readonly logger = new Logger(ElevenLabsService.name);
  private readonly apiKey: string;
  private readonly companionAgentId: string;
  private readonly personaAgentId: string;
  private readonly companionVoiceId: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('elevenlabs.apiKey') || '';
    this.companionAgentId = this.configService.get<string>('elevenlabs.companionAgentId') || '';
    this.personaAgentId = this.configService.get<string>('elevenlabs.personaAgentId') || '';
    this.companionVoiceId = this.configService.get<string>('elevenlabs.companionVoiceId') || 'Rachel';
  }

  private async getConversationToken(
    agentId: string,
    dynamicVariables?: Record<string, string>,
  ): Promise<string> {
    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    // Get WebRTC token for the Flutter SDK
    // API: GET /v1/convai/conversation/token?agent_id={agent_id}
    // Docs: https://elevenlabs.io/docs/api-reference/conversations/get-webrtc-token
    // Dynamic variables can be passed as query params to be available in webhooks
    let url = `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${agentId}`;
    
    // Add dynamic variables as query parameters
    if (dynamicVariables) {
      for (const [key, value] of Object.entries(dynamicVariables)) {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      this.logger.debug(`Passing dynamic variables to token: ${Object.keys(dynamicVariables).join(', ')}`);
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Failed to get conversation token: ${response.status} - ${errorText}`);
      throw new InternalServerErrorException('Failed to create ElevenLabs session');
    }

    const data = await response.json();
    this.logger.debug(`Got conversation token for agent ${agentId}`);
    // The token is used by the Flutter SDK for WebRTC connection
    return data.token;
  }

  async createCompanionSession(
    config: CompanionAgentConfig,
  ): Promise<ConversationSession> {
    this.logger.log(`Creating Companion session for user: ${config.dynamicVariables.user_name}`);

    if (!this.companionAgentId) {
      throw new InternalServerErrorException('Companion agent ID not configured');
    }

    // Get conversation token from ElevenLabs for WebRTC connection
    // Note: Dynamic variables are passed from the Flutter SDK, not here
    const signedUrl = await this.getConversationToken(this.companionAgentId);
    const conversationId = uuidv4();

    this.logger.debug(`Companion dynamic variables: ${JSON.stringify(Object.keys(config.dynamicVariables))}`);

    return {
      conversationId,
      conversationToken: signedUrl,
    };
  }

  async createPersonaSession(
    config: PersonaAgentConfig,
  ): Promise<ConversationSession> {
    this.logger.log(`Creating Persona session for: ${config.dynamicVariables.elderly_name}`);
    this.logger.log(`Persona Agent ID: ${this.personaAgentId}`);

    if (!this.personaAgentId) {
      throw new InternalServerErrorException('Persona agent ID not configured');
    }

    // Get conversation token from ElevenLabs for WebRTC connection
    // Pass dynamic variables so they're available in the agent
    const dynamicVars: Record<string, string> = {
      elderly_name: config.dynamicVariables.elderly_name,
      personality_block: config.dynamicVariables.personality_block,
      knowledge_graph: config.dynamicVariables.knowledge_graph,
      people_block: config.dynamicVariables.people_block,
      speech_patterns: config.dynamicVariables.speech_patterns,
    };
    const signedUrl = await this.getConversationToken(this.personaAgentId, dynamicVars);
    const conversationId = uuidv4();

    this.logger.log(`Persona session created: ${conversationId}`);
    this.logger.debug(`Persona dynamic variables: ${JSON.stringify(config.dynamicVariables)}`);
    this.logger.debug(`Using cloned voice ID: ${config.clonedVoiceId}`);

    return {
      conversationId,
      conversationToken: signedUrl,
    };
  }

  async createConversationSession(config: AgentConfig): Promise<ConversationSession> {
    if (config.type === AgentType.COMPANION) {
      return this.createCompanionSession(config);
    } else {
      return this.createPersonaSession(config);
    }
  }

  async getTranscript(sessionId: string): Promise<TranscriptResult> {
    this.logger.log(`Fetching transcript for session: ${sessionId}`);

    // TODO: Replace with actual ElevenLabs API call
    // GET https://api.elevenlabs.io/v1/convai/conversation/{sessionId}
    // Returns: { transcript, audio_url, ... }

    return {
      transcript:
        "Margaret: Oh, let me tell you about when I met Arthur. It was 1962, at the Palais dance hall. My friend Betty had dragged me there, and I wasn't keen on going at all. But then I saw him standing by the bar, looking so nervous in his best suit. When our eyes met, I just knew. He asked me to dance, and I said yes. We danced every Saturday after that until we got married in '64.",
      audioUrl: `https://storage.example.com/audio/${sessionId}.mp3`,
    };
  }

  async generateSpeech(text: string, voiceId: string): Promise<string> {
    this.logger.log(`Generating speech for text (${text.length} chars) with voice: ${voiceId}`);

    // TODO: Replace with actual ElevenLabs TTS API call
    // POST https://api.elevenlabs.io/v1/text-to-speech/{voiceId}
    // Headers: xi-api-key: {apiKey}
    // Body: { text, model_id: "eleven_multilingual_v2" }

    const audioId = uuidv4();
    return `https://storage.example.com/tts/${audioId}.mp3`;
  }

  async createInstantVoiceClone(
    audioSamples: Buffer[],
    name: string,
    description?: string,
  ): Promise<string> {
    this.logger.log(`Creating voice clone "${name}" from ${audioSamples.length} samples`);

    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    // Log buffer sizes for debugging
    this.logger.log(`Audio sample sizes: ${audioSamples.map(b => `${(b.length / 1024).toFixed(1)}KB`).join(', ')}`);

    // Create FormData for multipart upload
    const FormData = require('form-data');
    const axios = require('axios');
    const formData = new FormData();
    
    formData.append('name', name);
    if (description) {
      formData.append('description', description);
    }
    
    // Add audio samples as files - ElevenLabs expects audio/mpeg
    // Must use audio/mpeg with .mp3 extension for IVC to generate preview correctly
    audioSamples.forEach((buffer, index) => {
      formData.append('files', buffer, {
        filename: `sample_${index + 1}.mp3`,
        contentType: 'audio/mpeg',
      });
    });

    // API: POST /v1/voices/add
    // Docs: https://elevenlabs.io/docs/api-reference/add-voice
    try {
      const response = await axios.post('https://api.elevenlabs.io/v1/voices/add', formData, {
        headers: {
          'xi-api-key': this.apiKey,
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      const voiceId = response.data.voice_id;
      this.logger.log(`Created voice clone with ID: ${voiceId}`);
      return voiceId;
    } catch (error: any) {
      const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      this.logger.error(`Failed to create voice clone: ${error.response?.status || 'unknown'} - ${errorMsg}`);
      throw new InternalServerErrorException('Failed to create voice clone');
    }
  }

  async getVoiceCloneStatus(voiceId: string): Promise<{
    status: 'pending' | 'ready' | 'failed';
    samplesCount: number;
    qualityTier: 'none' | 'basic' | 'good' | 'excellent';
  }> {
    this.logger.log(`Checking voice clone status: ${voiceId}`);

    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    // API: GET /v1/voices/{voice_id}
    // Docs: https://elevenlabs.io/docs/api-reference/get-voice
    const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
      method: 'GET',
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Failed to get voice status: ${response.status} - ${errorText}`);
      throw new InternalServerErrorException('Failed to get voice clone status');
    }

    const data = await response.json();
    
    // Determine quality tier based on samples count
    const samplesCount = data.samples?.length || 0;
    let qualityTier: 'none' | 'basic' | 'good' | 'excellent' = 'none';
    if (samplesCount >= 10) qualityTier = 'excellent';
    else if (samplesCount >= 5) qualityTier = 'good';
    else if (samplesCount >= 3) qualityTier = 'basic';

    return {
      status: data.available_for_tiers ? 'ready' : 'pending',
      samplesCount,
      qualityTier,
    };
  }

  /**
   * Delete a voice clone from ElevenLabs
   * API: DELETE /v1/voices/{voice_id}
   * Docs: https://elevenlabs.io/docs/api-reference/delete-voice
   */
  async deleteVoice(voiceId: string): Promise<boolean> {
    this.logger.log(`Deleting voice: ${voiceId}`);

    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
      method: 'DELETE',
      headers: {
        'xi-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Failed to delete voice: ${response.status} - ${errorText}`);
      return false;
    }

    this.logger.log(`Voice ${voiceId} deleted successfully`);
    return true;
  }

  /**
   * Calculate user speaking duration from transcript timing data
   */
  calculateUserSpeakingDuration(
    transcript: Array<{ role: string; time_in_call_secs?: number }>,
    totalCallDuration: number,
  ): { userDurationSecs: number; agentDurationSecs: number } {
    let userDurationSecs = 0;
    let agentDurationSecs = 0;

    for (let i = 0; i < transcript.length; i++) {
      const current = transcript[i];
      const currentTime = current.time_in_call_secs || 0;
      const nextStartTime = i < transcript.length - 1
        ? (transcript[i + 1].time_in_call_secs || 0)
        : totalCallDuration;

      const duration = nextStartTime - currentTime;

      if (current.role === 'user') {
        userDurationSecs += duration;
      } else {
        agentDurationSecs += duration;
      }
    }

    return { userDurationSecs, agentDurationSecs };
  }

  /**
   * Get conversation details from ElevenLabs
   * API: GET /v1/convai/conversations/{conversation_id}
   * Docs: https://elevenlabs.io/docs/api-reference/conversations/get
   */
  async getConversation(conversationId: string): Promise<{
    conversationId: string;
    agentId: string;
    status: string;
    transcript: Array<{ role: string; message: string; time_in_call_secs?: number }>;
    metadata: Record<string, any>;
    callDurationSecs: number;
    userSpeakingDurationSecs: number;
    dynamicVariables?: Record<string, string>;
  }> {
    this.logger.log(`Fetching conversation: ${conversationId}`);

    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': this.apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Failed to get conversation: ${response.status} - ${errorText}`);
      throw new InternalServerErrorException(`Failed to get conversation: ${response.status}`);
    }

    const data = await response.json();
    
    const callDurationSecs = data.metadata?.call_duration_secs || 0;
    const transcript = data.transcript || [];
    
    // Calculate actual user speaking duration from transcript timing
    const { userDurationSecs } = this.calculateUserSpeakingDuration(transcript, callDurationSecs);
    
    this.logger.log(`Conversation ${conversationId} fetched successfully`);
    this.logger.log(`Status: ${data.status}, Duration: ${callDurationSecs}s, User speaking: ${userDurationSecs}s, Transcript messages: ${transcript.length}`);

    return {
      conversationId: data.conversation_id,
      agentId: data.agent_id,
      status: data.status,
      transcript,
      metadata: data.metadata || {},
      callDurationSecs,
      userSpeakingDurationSecs: userDurationSecs,
      dynamicVariables: data.conversation_initiation_client_data?.dynamic_variables,
    };
  }

  /**
   * Get conversation audio from ElevenLabs
   * API: GET /v1/convai/conversations/{conversation_id}/audio
   * Docs: https://elevenlabs.io/docs/api-reference/conversations/get-audio
   */
  async getConversationAudio(conversationId: string): Promise<Buffer> {
    this.logger.log(`Fetching audio for conversation: ${conversationId}`);

    if (!this.apiKey) {
      throw new InternalServerErrorException('ElevenLabs API key not configured');
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}/audio`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': this.apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Failed to get conversation audio: ${response.status} - ${errorText}`);
      throw new InternalServerErrorException(`Failed to get conversation audio: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(arrayBuffer);
    
    this.logger.log(`Audio fetched for ${conversationId}: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    return audioBuffer;
  }
}
