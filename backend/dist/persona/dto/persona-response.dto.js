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
exports.PersonaResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const story_response_dto_1 = require("../../stories/dto/story-response.dto");
class PersonaResponseDto {
    response;
    audioUrl;
    sourceStories;
}
exports.PersonaResponseDto = PersonaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The persona response text',
        example: "Oh, our wedding day! It was June 15th, 1964. Arthur was so nervous he nearly forgot the ring...",
    }),
    __metadata("design:type", String)
], PersonaResponseDto.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to the audio response in cloned voice',
        example: 'https://storage.example.com/tts/persona123.mp3',
    }),
    __metadata("design:type", String)
], PersonaResponseDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Source stories used to generate this response',
        type: [story_response_dto_1.StoryResponseDto],
    }),
    __metadata("design:type", Array)
], PersonaResponseDto.prototype, "sourceStories", void 0);
//# sourceMappingURL=persona-response.dto.js.map