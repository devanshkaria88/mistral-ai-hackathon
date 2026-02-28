"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ElevenLabsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevenLabsService = exports.AgentType = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
var AgentType;
(function (AgentType) {
    AgentType["COMPANION"] = "companion";
    AgentType["PERSONA"] = "persona";
})(AgentType || (exports.AgentType = AgentType = {}));
let ElevenLabsService = ElevenLabsService_1 = class ElevenLabsService {
    configService;
    logger = new common_1.Logger(ElevenLabsService_1.name);
    apiKey;
    companionAgentId;
    personaAgentId;
    companionVoiceId;
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('elevenlabs.apiKey') || '';
        this.companionAgentId = this.configService.get('elevenlabs.companionAgentId') || '';
        this.personaAgentId = this.configService.get('elevenlabs.personaAgentId') || '';
        this.companionVoiceId = this.configService.get('elevenlabs.companionVoiceId') || 'Rachel';
    }
    async createCompanionSession(config) {
        this.logger.log(`Creating Companion session for user: ${config.dynamicVariables.user_name}`);
        const sessionId = (0, uuid_1.v4)();
        this.logger.debug(`Companion dynamic variables: ${JSON.stringify(Object.keys(config.dynamicVariables))}`);
        return {
            sessionId,
            sessionUrl: `https://elevenlabs.io/convai/session/${sessionId}`,
        };
    }
    async createPersonaSession(config) {
        this.logger.log(`Creating Persona session for: ${config.dynamicVariables.elderly_name}`);
        const sessionId = (0, uuid_1.v4)();
        this.logger.debug(`Persona dynamic variables: ${JSON.stringify(Object.keys(config.dynamicVariables))}`);
        this.logger.debug(`Using cloned voice ID: ${config.clonedVoiceId}`);
        return {
            sessionId,
            sessionUrl: `https://elevenlabs.io/convai/session/${sessionId}`,
        };
    }
    async createConversationSession(config) {
        if (config.type === AgentType.COMPANION) {
            return this.createCompanionSession(config);
        }
        else {
            return this.createPersonaSession(config);
        }
    }
    async getTranscript(sessionId) {
        this.logger.log(`Fetching transcript for session: ${sessionId}`);
        return {
            transcript: "Margaret: Oh, let me tell you about when I met Arthur. It was 1962, at the Palais dance hall. My friend Betty had dragged me there, and I wasn't keen on going at all. But then I saw him standing by the bar, looking so nervous in his best suit. When our eyes met, I just knew. He asked me to dance, and I said yes. We danced every Saturday after that until we got married in '64.",
            audioUrl: `https://storage.example.com/audio/${sessionId}.mp3`,
        };
    }
    async generateSpeech(text, voiceId) {
        this.logger.log(`Generating speech for text (${text.length} chars) with voice: ${voiceId}`);
        const audioId = (0, uuid_1.v4)();
        return `https://storage.example.com/tts/${audioId}.mp3`;
    }
    async createInstantVoiceClone(audioSamples, name, description) {
        this.logger.log(`Creating voice clone "${name}" from ${audioSamples.length} samples`);
        const voiceId = `voice_clone_${(0, uuid_1.v4)()}`;
        this.logger.log(`Created voice clone with ID: ${voiceId}`);
        return voiceId;
    }
    async getVoiceCloneStatus(voiceId) {
        this.logger.log(`Checking voice clone status: ${voiceId}`);
        return {
            status: 'ready',
            samplesCount: 5,
            qualityTier: 'good',
        };
    }
};
exports.ElevenLabsService = ElevenLabsService;
exports.ElevenLabsService = ElevenLabsService = ElevenLabsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ElevenLabsService);
//# sourceMappingURL=elevenlabs.service.js.map