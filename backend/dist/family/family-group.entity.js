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
exports.FamilyGroup = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_entity_1 = require("../users/user.entity");
let FamilyGroup = class FamilyGroup extends base_entity_1.BaseEntity {
    name;
    inviteCode;
    elderlyUserId;
    members;
};
exports.FamilyGroup = FamilyGroup;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FamilyGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'invite_code', unique: true }),
    __metadata("design:type", String)
], FamilyGroup.prototype, "inviteCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'elderly_user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], FamilyGroup.prototype, "elderlyUserId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.familyGroup),
    __metadata("design:type", Array)
], FamilyGroup.prototype, "members", void 0);
exports.FamilyGroup = FamilyGroup = __decorate([
    (0, typeorm_1.Entity)('family_groups')
], FamilyGroup);
//# sourceMappingURL=family-group.entity.js.map