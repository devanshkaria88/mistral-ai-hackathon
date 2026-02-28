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
exports.PersonaMessageResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PersonaMessageResponseDto {
    id;
    question;
    response;
    responseAudioUrl;
    sourceStoryIds;
    createdAt;
}
exports.PersonaMessageResponseDto = PersonaMessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Message ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], PersonaMessageResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The question asked',
        example: 'What was your wedding day like?',
    }),
    __metadata("design:type", String)
], PersonaMessageResponseDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The persona response',
        example: "Oh, our wedding day! It was June 15th, 1964...",
    }),
    __metadata("design:type", String)
], PersonaMessageResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the audio response',
        example: 'https://storage.example.com/tts/persona123.mp3',
    }),
    __metadata("design:type", String)
], PersonaMessageResponseDto.prototype, "responseAudioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IDs of stories used as context',
        type: [String],
        example: ['550e8400-e29b-41d4-a716-446655440001'],
    }),
    __metadata("design:type", Array)
], PersonaMessageResponseDto.prototype, "sourceStoryIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the message was created',
        example: '2026-02-28T14:30:00Z',
    }),
    __metadata("design:type", Date)
], PersonaMessageResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=persona-message-response.dto.js.map