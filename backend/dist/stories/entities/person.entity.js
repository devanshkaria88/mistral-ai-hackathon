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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../common/entities/base.entity");
const story_entity_1 = require("../story.entity");
let Person = class Person extends base_entity_1.BaseEntity {
    name;
    relationship;
    userId;
    stories;
};
exports.Person = Person;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "relationship", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Person.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => story_entity_1.Story, (story) => story.people),
    __metadata("design:type", Array)
], Person.prototype, "stories", void 0);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)('people')
], Person);
//# sourceMappingURL=person.entity.js.map