import { ConfigService } from '@nestjs/config';
export interface ConversationSession {
    sessionId: string;
    sessionUrl: string;
}
export interface TranscriptResult {
    transcript: string;
    audioUrl: string;
}
export declare enum AgentType {
    COMPANION = "companion",
    PERSONA = "persona"
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
export declare class ElevenLabsService {
    private readonly configService;
    private readonly logger;
    private readonly apiKey;
    private readonly companionAgentId;
    private readonly personaAgentId;
    private readonly companionVoiceId;
    constructor(configService: ConfigService);
    createCompanionSession(config: CompanionAgentConfig): Promise<ConversationSession>;
    createPersonaSession(config: PersonaAgentConfig): Promise<ConversationSession>;
    createConversationSession(config: AgentConfig): Promise<ConversationSession>;
    getTranscript(sessionId: string): Promise<TranscriptResult>;
    generateSpeech(text: string, voiceId: string): Promise<string>;
    createInstantVoiceClone(audioSamples: Buffer[], name: string, description?: string): Promise<string>;
    getVoiceCloneStatus(voiceId: string): Promise<{
        status: 'pending' | 'ready' | 'failed';
        samplesCount: number;
        qualityTier: 'none' | 'basic' | 'good' | 'excellent';
    }>;
}
