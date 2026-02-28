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
exports.VoiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voice_service_1 = require("./voice.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const error_response_dto_1 = require("../common/dto/error-response.dto");
let VoiceController = class VoiceController {
    voiceService;
    constructor(voiceService) {
        this.voiceService = voiceService;
    }
    async getProfile(user) {
        return this.voiceService.getProfile(user.id);
    }
    async updateClone(user) {
        return this.voiceService.updateClone(user.id);
    }
};
exports.VoiceController = VoiceController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current voice profile status' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Voice profile details',
        type: dto_1.VoiceProfileResponseDto,
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
], VoiceController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('update-clone'),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger voice clone update with latest samples' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Clone update initiated',
        type: dto_1.UpdateCloneResponseDto,
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
], VoiceController.prototype, "updateClone", null);
exports.VoiceController = VoiceController = __decorate([
    (0, swagger_1.ApiTags)('voice'),
    (0, common_1.Controller)('voice'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [voice_service_1.VoiceService])
], VoiceController);
//# sourceMappingURL=voice.controller.js.map