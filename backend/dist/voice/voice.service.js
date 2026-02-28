"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var VoiceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const voice_quality_tier_enum_1 = require("../common/types/voice-quality-tier.enum");
let VoiceService = VoiceService_1 = class VoiceService {
    logger = new common_1.Logger(VoiceService_1.name);
    async getProfile(userId) {
        this.logger.log(`Fetching voice profile for user: ${userId}`);
        return {
            id: (0, uuid_1.v4)(),
            userId,
            elevenLabsVoiceId: 'voice_abc123',
            samplesCount: 5,
            totalAudioSeconds: 324.5,
            qualityTier: voice_quality_tier_enum_1.VoiceQualityTier.GOOD,
            lastUpdatedAt: new Date('2026-02-27T15:00:00Z'),
        };
    }
    async updateClone(userId) {
        this.logger.log(`Updating voice clone for user: ${userId}`);
        return {
            status: 'updating',
            samplesCount: 5,
        };
    }
};
exports.VoiceService = VoiceService;
exports.VoiceService = VoiceService = VoiceService_1 = __decorate([
    (0, common_1.Injectable)()
], VoiceService);
//# sourceMappingURL=voice.service.js.map