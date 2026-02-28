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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_role_enum_1 = require("../common/types/user-role.enum");
const family_group_entity_1 = require("../family/family-group.entity");
const conversation_entity_1 = require("../conversations/conversation.entity");
const voice_profile_entity_1 = require("../voice/voice-profile.entity");
let User = class User extends base_entity_1.BaseEntity {
    email;
    displayName;
    photoUrl;
    firebaseUid;
    role;
    refreshTokenHash;
    familyGroupId;
    familyGroup;
    conversations;
    voiceProfile;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name' }),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_url', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firebase_uid', unique: true }),
    __metadata("design:type", String)
], User.prototype, "firebaseUid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.ELDERLY,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token_hash', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshTokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'family_group_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "familyGroupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => family_group_entity_1.FamilyGroup, (familyGroup) => familyGroup.members, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'family_group_id' }),
    __metadata("design:type", family_group_entity_1.FamilyGroup)
], User.prototype, "familyGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => conversation_entity_1.Conversation, (conversation) => conversation.user),
    __metadata("design:type", Array)
], User.prototype, "conversations", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => voice_profile_entity_1.VoiceProfile, (voiceProfile) => voiceProfile.user),
    __metadata("design:type", voice_profile_entity_1.VoiceProfile)
], User.prototype, "voiceProfile", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map