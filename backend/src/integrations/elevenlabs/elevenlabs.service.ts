import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export interface ConversationSession {
  sessionId: string;
  sessionUrl: string;
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
  stories_block: string;
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
  clonedVoiceId: string;
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

  async createCompanionSession(config: CompanionAgentConfig): Promise<ConversationSession> {
    this.logger.log(`Creating Companion session for user: ${config.dynamicVariables.user_name}`);

    // ElevenLabs agent already has the system prompt configured
    // We just pass the dynamic variables that get injected into the prompt template
    // POST https://api.elevenlabs.io/v1/convai/conversation
    // Headers: xi-api-key: {apiKey}
    // Body: {
    //   agent_id: this.companionAgentId,
    //   dynamic_variables: {
    //     user_name: config.dynamicVariables.user_name,
    //     user_age: config.dynamicVariables.user_age,
    //     context_block: config.dynamicVariables.context_block,
    //     stories_summary: config.dynamicVariables.stories_summary,
    //     exploration_suggestions: config.dynamicVariables.exploration_suggestions,
    //   },
    //   first_message: config.firstMessage,
    // }

    const sessionId = uuidv4();
    this.logger.debug(`Companion dynamic variables: ${JSON.stringify(Object.keys(config.dynamicVariables))}`);

    return {
      sessionId,
      sessionUrl: `https://elevenlabs.io/convai/session/${sessionId}`,
    };
  }

  async createPersonaSession(config: PersonaAgentConfig): Promise<ConversationSession> {
    this.logger.log(`Creating Persona session for: ${config.dynamicVariables.elderly_name}`);

    // ElevenLabs agent already has the system prompt configured
    // We pass dynamic variables + override the voice to use the cloned voice
    // POST https://api.elevenlabs.io/v1/convai/conversation
    // Headers: xi-api-key: {apiKey}
    // Body: {
    //   agent_id: this.personaAgentId,
    //   dynamic_variables: {
    //     elderly_name: config.dynamicVariables.elderly_name,
    //     personality_block: config.dynamicVariables.personality_block,
    //     stories_block: config.dynamicVariables.stories_block,
    //     people_block: config.dynamicVariables.people_block,
    //     speech_patterns: config.dynamicVariables.speech_patterns,
    //   },
    //   first_message: config.firstMessage,
    //   agent_overrides: {
    //     tts: {
    //       voice_id: config.clonedVoiceId,  // Override with elderly person's cloned voice
    //     }
    //   }
    // }

    const sessionId = uuidv4();
    this.logger.debug(`Persona dynamic variables: ${JSON.stringify(Object.keys(config.dynamicVariables))}`);
    this.logger.debug(`Using cloned voice ID: ${config.clonedVoiceId}`);

    return {
      sessionId,
      sessionUrl: `https://elevenlabs.io/convai/session/${sessionId}`,
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

    // TODO: Replace with actual ElevenLabs IVC API call
    // POST https://api.elevenlabs.io/v1/voices/add
    // Headers: xi-api-key: {apiKey}
    // Body (multipart/form-data): {
    //   name: name,
    //   description: description,
    //   files: audioSamples,
    //   labels: { "type": "cloned", "source": "resurrect" }
    // }

    const voiceId = `voice_clone_${uuidv4()}`;
    this.logger.log(`Created voice clone with ID: ${voiceId}`);
    return voiceId;
  }

  async getVoiceCloneStatus(voiceId: string): Promise<{
    status: 'pending' | 'ready' | 'failed';
    samplesCount: number;
    qualityTier: 'none' | 'basic' | 'good' | 'excellent';
  }> {
    this.logger.log(`Checking voice clone status: ${voiceId}`);

    // TODO: Replace with actual ElevenLabs API call
    // GET https://api.elevenlabs.io/v1/voices/{voiceId}

    return {
      status: 'ready',
      samplesCount: 5,
      qualityTier: 'good',
    };
  }
}
