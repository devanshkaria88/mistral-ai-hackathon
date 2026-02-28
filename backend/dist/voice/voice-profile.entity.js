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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceProfile = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const voice_quality_tier_enum_1 = require("../common/types/voice-quality-tier.enum");
const user_entity_1 = require("../users/user.entity");
let VoiceProfile = class VoiceProfile extends base_entity_1.BaseEntity {
    userId;
    elevenLabsVoiceId;
    samplesCount;
    totalAudioSeconds;
    qualityTier;
    lastUpdatedAt;
    user;
};
exports.VoiceProfile = VoiceProfile;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], VoiceProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'elevenlabs_voice_id', nullable: true }),
    __metadata("design:type", String)
], VoiceProfile.prototype, "elevenLabsVoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'samples_count', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], VoiceProfile.prototype, "samplesCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_audio_seconds', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], VoiceProfile.prototype, "totalAudioSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'quality_tier',
        type: 'enum',
        enum: voice_quality_tier_enum_1.VoiceQualityTier,
        default: voice_quality_tier_enum_1.VoiceQualityTier.NONE,
    }),
    __metadata("design:type", String)
], VoiceProfile.prototype, "qualityTier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_updated_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], VoiceProfile.prototype, "lastUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.voiceProfile),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], VoiceProfile.prototype, "user", void 0);
exports.VoiceProfile = VoiceProfile = __decorate([
    (0, typeorm_1.Entity)('voice_profiles')
], VoiceProfile);
//# sourceMappingURL=voice-profile.entity.js.map