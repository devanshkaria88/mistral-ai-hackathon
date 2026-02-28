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
exports.StartConversationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StartConversationResponseDto {
    conversationId;
    sessionUrl;
}
exports.StartConversationResponseDto = StartConversationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the conversation',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], StartConversationResponseDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ElevenLabs session URL for voice interaction',
        example: 'https://elevenlabs.io/convai/session/abc123',
    }),
    __metadata("design:type", String)
], StartConversationResponseDto.prototype, "sessionUrl", void 0);
//# sourceMappingURL=start-conversation-response.dto.js.map