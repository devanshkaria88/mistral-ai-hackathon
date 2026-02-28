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
exports.ConversationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conversations_service_1 = require("./conversations.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const error_response_dto_1 = require("../common/dto/error-response.dto");
let ConversationsController = class ConversationsController {
    conversationsService;
    constructor(conversationsService) {
        this.conversationsService = conversationsService;
    }
    async startConversation(user, dto) {
        return this.conversationsService.startConversation(user.id, dto);
    }
    async endConversation(id) {
        return this.conversationsService.endConversation(id);
    }
    async findAll(user) {
        return this.conversationsService.findAll(user.id);
    }
    async findOne(id) {
        return this.conversationsService.findOne(id);
    }
};
exports.ConversationsController = ConversationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a new conversation session',
        description: 'For voice-first UI: Companion mode for elderly users, Persona mode for family members talking to elderly persona'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Conversation session started with ElevenLabs session URL',
        type: dto_1.StartConversationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid mode or missing elderlyUserId for persona mode',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        dto_1.StartConversationDto]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "startConversation", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'End a conversation and trigger processing' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Conversation ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversation ended, processing started',
        type: dto_1.EndConversationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "endConversation", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all conversations for the current user' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of conversations',
        type: [dto_1.ConversationResponseDto],
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
], ConversationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single conversation with extracted stories' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Conversation ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Conversation details',
        type: dto_1.ConversationResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Conversation not found',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConversationsController.prototype, "findOne", null);
exports.ConversationsController = ConversationsController = __decorate([
    (0, swagger_1.ApiTags)('conversations'),
    (0, common_1.Controller)('conversations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [conversations_service_1.ConversationsService])
], ConversationsController);
//# sourceMappingURL=conversations.controller.js.map