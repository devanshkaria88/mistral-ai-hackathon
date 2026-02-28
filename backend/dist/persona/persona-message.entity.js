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
exports.PersonaMessage = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_entity_1 = require("../users/user.entity");
let PersonaMessage = class PersonaMessage extends base_entity_1.BaseEntity {
    familyUserId;
    elderlyUserId;
    question;
    response;
    responseAudioUrl;
    sourceStoryIds;
    familyUser;
    elderlyUser;
};
exports.PersonaMessage = PersonaMessage;
__decorate([
    (0, typeorm_1.Column)({ name: 'family_user_id', type: 'uuid' }),
    __metadata("design:type", String)
], PersonaMessage.prototype, "familyUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'elderly_user_id', type: 'uuid' }),
    __metadata("design:type", String)
], PersonaMessage.prototype, "elderlyUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PersonaMessage.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PersonaMessage.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'response_audio_url', nullable: true }),
    __metadata("design:type", String)
], PersonaMessage.prototype, "responseAudioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'source_story_ids', type: 'jsonb', default: [] }),
    __metadata("design:type", Array)
], PersonaMessage.prototype, "sourceStoryIds", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'family_user_id' }),
    __metadata("design:type", user_entity_1.User)
], PersonaMessage.prototype, "familyUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'elderly_user_id' }),
    __metadata("design:type", user_entity_1.User)
], PersonaMessage.prototype, "elderlyUser", void 0);
exports.PersonaMessage = PersonaMessage = __decorate([
    (0, typeorm_1.Entity)('persona_messages')
], PersonaMessage);
//# sourceMappingURL=persona-message.entity.js.map