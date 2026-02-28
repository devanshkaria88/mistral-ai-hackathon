"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FamilyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const voice_quality_tier_enum_1 = require("../common/types/voice-quality-tier.enum");
let FamilyService = FamilyService_1 = class FamilyService {
    logger = new common_1.Logger(FamilyService_1.name);
    async createInvite(elderlyUserId) {
        this.logger.log(`Creating invite for elderly user: ${elderlyUserId}`);
        const inviteCode = `MV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        return {
            inviteCode,
            inviteLink: `https://memoryvault.app/join/${inviteCode}`,
        };
    }
    async getVault(elderlyUserId) {
        this.logger.log(`Fetching vault for elderly user: ${elderlyUserId}`);
        return {
            stories: [
                {
                    id: (0, uuid_1.v4)(),
                    title: 'Meeting Arthur at the Dance Hall',
                    content: "It was 1962, and I was just nineteen...",
                    audioUrl: 'https://storage.example.com/tts/story1.mp3',
                    timePeriod: '1962',
                    emotionalTone: 'nostalgic',
                    userId: elderlyUserId,
                    createdAt: new Date('2026-02-27T10:30:00Z'),
                    people: [
                        { id: (0, uuid_1.v4)(), name: 'Arthur', relationship: 'husband' },
                    ],
                    places: [
                        { id: (0, uuid_1.v4)(), name: 'Palais Dance Hall' },
                    ],
                    themes: [
                        { id: (0, uuid_1.v4)(), name: 'Love', slug: 'love' },
                    ],
                },
            ],
            stats: {
                totalStories: 24,
                totalConversations: 8,
                totalMinutes: 156,
                peopleCount: 12,
                placesCount: 7,
            },
            voiceProfile: {
                qualityTier: voice_quality_tier_enum_1.VoiceQualityTier.GOOD,
                samplesCount: 5,
                totalAudioSeconds: 324.5,
            },
        };
    }
};
exports.FamilyService = FamilyService;
exports.FamilyService = FamilyService = FamilyService_1 = __decorate([
    (0, common_1.Injectable)()
], FamilyService);
//# sourceMappingURL=family.service.js.map