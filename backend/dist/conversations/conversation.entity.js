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
exports.Conversation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const conversation_status_enum_1 = require("../common/types/conversation-status.enum");
const user_entity_1 = require("../users/user.entity");
const story_entity_1 = require("../stories/story.entity");
let Conversation = class Conversation extends base_entity_1.BaseEntity {
    userId;
    elevenLabsSessionId;
    status;
    transcript;
    audioUrl;
    metadata;
    deletedAt;
    user;
    stories;
};
exports.Conversation = Conversation;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Conversation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'elevenlabs_session_id', nullable: true }),
    __metadata("design:type", String)
], Conversation.prototype, "elevenLabsSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: conversation_status_enum_1.ConversationStatus,
        default: conversation_status_enum_1.ConversationStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Conversation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Conversation.prototype, "transcript", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audio_url', nullable: true }),
    __metadata("design:type", String)
], Conversation.prototype, "audioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Conversation.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Conversation.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.conversations),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Conversation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => story_entity_1.Story, (story) => story.conversation),
    __metadata("design:type", Array)
], Conversation.prototype, "stories", void 0);
exports.Conversation = Conversation = __decorate([
    (0, typeorm_1.Entity)('conversations')
], Conversation);
//# sourceMappingURL=conversation.entity.js.map