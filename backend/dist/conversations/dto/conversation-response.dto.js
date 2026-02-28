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
exports.ConversationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const conversation_status_enum_1 = require("../../common/types/conversation-status.enum");
class ConversationResponseDto {
    id;
    userId;
    status;
    transcript;
    audioUrl;
    createdAt;
    updatedAt;
    storiesCount;
}
exports.ConversationResponseDto = ConversationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the conversation',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the elderly person',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the conversation',
        enum: conversation_status_enum_1.ConversationStatus,
        example: conversation_status_enum_1.ConversationStatus.PROCESSED,
    }),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Full transcript of the conversation',
        example: 'Margaret: Let me tell you about when I met Arthur...',
    }),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "transcript", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the audio recording',
        example: 'https://storage.example.com/audio/conv123.mp3',
    }),
    __metadata("design:type", String)
], ConversationResponseDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the conversation was created',
        example: '2026-02-28T14:30:00Z',
    }),
    __metadata("design:type", Date)
], ConversationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the conversation was last updated',
        example: '2026-02-28T15:00:00Z',
    }),
    __metadata("design:type", Date)
], ConversationResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of stories extracted from this conversation',
        example: 3,
    }),
    __metadata("design:type", Number)
], ConversationResponseDto.prototype, "storiesCount", void 0);
//# sourceMappingURL=conversation-response.dto.js.map