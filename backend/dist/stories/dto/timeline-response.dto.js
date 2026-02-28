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
exports.TimelineResponseDto = exports.TimelinePeriodDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const story_response_dto_1 = require("./story-response.dto");
class TimelinePeriodDto {
    period;
    stories;
}
exports.TimelinePeriodDto = TimelinePeriodDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time period label',
        example: '1960s',
    }),
    __metadata("design:type", String)
], TimelinePeriodDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stories from this time period',
        type: [story_response_dto_1.StoryResponseDto],
    }),
    __metadata("design:type", Array)
], TimelinePeriodDto.prototype, "stories", void 0);
class TimelineResponseDto {
    timeline;
}
exports.TimelineResponseDto = TimelineResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stories grouped by time period',
        type: [TimelinePeriodDto],
    }),
    __metadata("design:type", Array)
], TimelineResponseDto.prototype, "timeline", void 0);
//# sourceMappingURL=timeline-response.dto.js.map