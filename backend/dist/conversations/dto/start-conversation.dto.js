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
exports.StartConversationDto = exports.ConversationMode = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ConversationMode;
(function (ConversationMode) {
    ConversationMode["COMPANION"] = "companion";
    ConversationMode["PERSONA"] = "persona";
})(ConversationMode || (exports.ConversationMode = ConversationMode = {}));
class StartConversationDto {
    mode;
    elderlyUserId;
}
exports.StartConversationDto = StartConversationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ConversationMode,
        description: 'Type of conversation: companion (for elderly users) or persona (for family members)',
        example: ConversationMode.COMPANION,
    }),
    (0, class_validator_1.IsEnum)(ConversationMode),
    __metadata("design:type", String)
], StartConversationDto.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Required when mode is PERSONA - the elderly user whose persona to talk to',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], StartConversationDto.prototype, "elderlyUserId", void 0);
//# sourceMappingURL=start-conversation.dto.js.map