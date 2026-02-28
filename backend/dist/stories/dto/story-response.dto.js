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
exports.StoryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const person_response_dto_1 = require("./person-response.dto");
const place_response_dto_1 = require("./place-response.dto");
const theme_response_dto_1 = require("./theme-response.dto");
class StoryResponseDto {
    id;
    title;
    content;
    audioUrl;
    timePeriod;
    emotionalTone;
    userId;
    conversationId;
    createdAt;
    people;
    places;
    themes;
}
exports.StoryResponseDto = StoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the story',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the story',
        example: 'Meeting Arthur at the Dance Hall',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full narrative content of the story',
        example: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall...",
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the audio version in cloned voice',
        example: 'https://storage.example.com/tts/story123.mp3',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Time period the story relates to',
        example: '1962',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "timePeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Emotional tone of the story',
        example: 'nostalgic',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "emotionalTone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID of the elderly person',
        example: '550e8400-e29b-41d4-a716-446655440001',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Conversation ID this story was extracted from',
        example: '550e8400-e29b-41d4-a716-446655440002',
    }),
    __metadata("design:type", String)
], StoryResponseDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'When the story was created',
        example: '2026-02-28T14:30:00Z',
    }),
    __metadata("design:type", Date)
], StoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'People mentioned in this story',
        type: [person_response_dto_1.PersonResponseDto],
    }),
    __metadata("design:type", Array)
], StoryResponseDto.prototype, "people", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Places mentioned in this story',
        type: [place_response_dto_1.PlaceResponseDto],
    }),
    __metadata("design:type", Array)
], StoryResponseDto.prototype, "places", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Themes associated with this story',
        type: [theme_response_dto_1.ThemeResponseDto],
    }),
    __metadata("design:type", Array)
], StoryResponseDto.prototype, "themes", void 0);
//# sourceMappingURL=story-response.dto.js.map