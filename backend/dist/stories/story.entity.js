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
exports.Story = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const conversation_entity_1 = require("../conversations/conversation.entity");
const user_entity_1 = require("../users/user.entity");
const person_entity_1 = require("./entities/person.entity");
const place_entity_1 = require("./entities/place.entity");
const theme_entity_1 = require("./entities/theme.entity");
let Story = class Story extends base_entity_1.BaseEntity {
    title;
    content;
    audioUrl;
    timePeriod;
    emotionalTone;
    embedding;
    metadata;
    deletedAt;
    conversationId;
    userId;
    conversation;
    user;
    people;
    places;
    themes;
};
exports.Story = Story;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Story.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Story.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'audio_url', nullable: true }),
    __metadata("design:type", String)
], Story.prototype, "audioUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_period', nullable: true }),
    __metadata("design:type", String)
], Story.prototype, "timePeriod", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'emotional_tone', nullable: true }),
    __metadata("design:type", String)
], Story.prototype, "emotionalTone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'vector', length: 1024, nullable: true }),
    __metadata("design:type", String)
], Story.prototype, "embedding", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Story.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], Story.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'conversation_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Story.prototype, "conversationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Story.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conversation_entity_1.Conversation, (conversation) => conversation.stories, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'conversation_id' }),
    __metadata("design:type", conversation_entity_1.Conversation)
], Story.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Story.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => person_entity_1.Person, (person) => person.stories),
    (0, typeorm_1.JoinTable)({
        name: 'story_people',
        joinColumn: { name: 'story_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Story.prototype, "people", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => place_entity_1.Place, (place) => place.stories),
    (0, typeorm_1.JoinTable)({
        name: 'story_places',
        joinColumn: { name: 'story_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'place_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Story.prototype, "places", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => theme_entity_1.Theme, (theme) => theme.stories),
    (0, typeorm_1.JoinTable)({
        name: 'story_themes',
        joinColumn: { name: 'story_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'theme_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Story.prototype, "themes", void 0);
exports.Story = Story = __decorate([
    (0, typeorm_1.Entity)('stories')
], Story);
//# sourceMappingURL=story.entity.js.map