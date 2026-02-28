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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stories_service_1 = require("./stories.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const error_response_dto_1 = require("../common/dto/error-response.dto");
let StoriesController = class StoriesController {
    storiesService;
    constructor(storiesService) {
        this.storiesService = storiesService;
    }
    async findAll(user, query) {
        return this.storiesService.findAll(user.id, query);
    }
    async search(user, query) {
        return this.storiesService.search(user.id, query.q);
    }
    async getTimeline(user) {
        return this.storiesService.getTimeline(user.id);
    }
    async getThemes() {
        return this.storiesService.getThemes();
    }
    async findOne(id) {
        return this.storiesService.findOne(id);
    }
    async toggleBookmark(id, user) {
        return this.storiesService.toggleBookmark(id, user.id);
    }
};
exports.StoriesController = StoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List stories with optional filters' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of stories',
        type: [dto_1.StoryResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        dto_1.StoryFilterQueryDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Semantic search across stories' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Search results',
        type: [dto_1.StoryResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        dto_1.SearchQueryDto]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get stories grouped by time period' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Timeline of stories',
        type: dto_1.TimelineResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "getTimeline", null);
__decorate([
    (0, common_1.Get)('themes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available themes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of themes',
        type: [dto_1.ThemeResponseDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "getThemes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single story by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Story ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Story details',
        type: dto_1.StoryResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Story not found',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/bookmark'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle bookmark on a story' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Story ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bookmark toggled',
        type: dto_1.BookmarkResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StoriesController.prototype, "toggleBookmark", null);
exports.StoriesController = StoriesController = __decorate([
    (0, swagger_1.ApiTags)('stories'),
    (0, common_1.Controller)('stories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [stories_service_1.StoriesService])
], StoriesController);
//# sourceMappingURL=stories.controller.js.map