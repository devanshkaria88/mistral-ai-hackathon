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
exports.PlaceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PlaceResponseDto {
    id;
    name;
    description;
    latitude;
    longitude;
}
exports.PlaceResponseDto = PlaceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the place',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    __metadata("design:type", String)
], PlaceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the place',
        example: 'Palais Dance Hall',
    }),
    __metadata("design:type", String)
], PlaceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Description of the place',
        example: 'Local dance venue in London',
    }),
    __metadata("design:type", String)
], PlaceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Latitude coordinate',
        example: 51.5074,
    }),
    __metadata("design:type", Number)
], PlaceResponseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Longitude coordinate',
        example: -0.1278,
    }),
    __metadata("design:type", Number)
], PlaceResponseDto.prototype, "longitude", void 0);
//# sourceMappingURL=place-response.dto.js.map