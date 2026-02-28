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
exports.VaultResponseDto = exports.VoiceProfileSummaryDto = exports.VaultStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const story_response_dto_1 = require("../../stories/dto/story-response.dto");
const voice_quality_tier_enum_1 = require("../../common/types/voice-quality-tier.enum");
class VaultStatsDto {
    totalStories;
    totalConversations;
    totalMinutes;
    peopleCount;
    placesCount;
}
exports.VaultStatsDto = VaultStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of stories',
        example: 24,
    }),
    __metadata("design:type", Number)
], VaultStatsDto.prototype, "totalStories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of conversations',
        example: 8,
    }),
    __metadata("design:type", Number)
], VaultStatsDto.prototype, "totalConversations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total minutes of conversation',
        example: 156,
    }),
    __metadata("design:type", Number)
], VaultStatsDto.prototype, "totalMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of unique people mentioned',
        example: 12,
    }),
    __metadata("design:type", Number)
], VaultStatsDto.prototype, "peopleCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of unique places mentioned',
        example: 7,
    }),
    __metadata("design:type", Number)
], VaultStatsDto.prototype, "placesCount", void 0);
class VoiceProfileSummaryDto {
    qualityTier;
    samplesCount;
    totalAudioSeconds;
}
exports.VoiceProfileSummaryDto = VoiceProfileSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current voice quality tier',
        enum: voice_quality_tier_enum_1.VoiceQualityTier,
        example: voice_quality_tier_enum_1.VoiceQualityTier.GOOD,
    }),
    __metadata("design:type", String)
], VoiceProfileSummaryDto.prototype, "qualityTier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of audio samples collected',
        example: 5,
    }),
    __metadata("design:type", Number)
], VoiceProfileSummaryDto.prototype, "samplesCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total seconds of audio collected',
        example: 324.5,
    }),
    __metadata("design:type", Number)
], VoiceProfileSummaryDto.prototype, "totalAudioSeconds", void 0);
class VaultResponseDto {
    stories;
    stats;
    voiceProfile;
}
exports.VaultResponseDto = VaultResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recent stories from the vault',
        type: [story_response_dto_1.StoryResponseDto],
    }),
    __metadata("design:type", Array)
], VaultResponseDto.prototype, "stories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vault statistics',
        type: VaultStatsDto,
    }),
    __metadata("design:type", VaultStatsDto)
], VaultResponseDto.prototype, "stats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Voice profile status',
        type: VoiceProfileSummaryDto,
    }),
    __metadata("design:type", VoiceProfileSummaryDto)
], VaultResponseDto.prototype, "voiceProfile", void 0);
//# sourceMappingURL=vault-response.dto.js.map