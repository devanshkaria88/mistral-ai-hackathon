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
exports.VoiceProfileResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const voice_quality_tier_enum_1 = require("../../common/types/voice-quality-tier.enum");
class VoiceProfileResponseDto {
    id;
    userId;
    elevenLabsVoiceId;
    samplesCount;
    totalAudioSeconds;
    qualityTier;
    lastUpdatedAt;
}
exports.VoiceProfileResponseDto = VoiceProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Voice profile ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], VoiceProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID this profile belongs to',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    __metadata("design:type", String)
], VoiceProfileResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ElevenLabs voice clone ID',
        example: 'voice_abc123',
    }),
    __metadata("design:type", String)
], VoiceProfileResponseDto.prototype, "elevenLabsVoiceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of audio samples collected',
        example: 5,
    }),
    __metadata("design:type", Number)
], VoiceProfileResponseDto.prototype, "samplesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total seconds of audio collected',
        example: 324.5,
    }),
    __metadata("design:type", Number)
], VoiceProfileResponseDto.prototype, "totalAudioSeconds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current voice quality tier',
        enum: voice_quality_tier_enum_1.VoiceQualityTier,
        example: voice_quality_tier_enum_1.VoiceQualityTier.GOOD,
    }),
    __metadata("design:type", String)
], VoiceProfileResponseDto.prototype, "qualityTier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'When the voice profile was last updated',
        example: '2026-02-28T14:30:00Z',
    }),
    __metadata("design:type", Date)
], VoiceProfileResponseDto.prototype, "lastUpdatedAt", void 0);
//# sourceMappingURL=voice-profile-response.dto.js.map