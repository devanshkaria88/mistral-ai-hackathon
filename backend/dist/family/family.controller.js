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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const family_service_1 = require("./family.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const error_response_dto_1 = require("../common/dto/error-response.dto");
let FamilyController = class FamilyController {
    familyService;
    constructor(familyService) {
        this.familyService = familyService;
    }
    async createInvite(dto) {
        return this.familyService.createInvite(dto.elderlyUserId);
    }
    async getVault(elderlyUserId) {
        return this.familyService.getVault(elderlyUserId);
    }
};
exports.FamilyController = FamilyController;
__decorate([
    (0, common_1.Post)('invite'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an invite link for family members' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Invite created',
        type: dto_1.InviteResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateInviteDto]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "createInvite", null);
__decorate([
    (0, common_1.Get)('vault/:elderlyUserId'),
    (0, swagger_1.ApiOperation)({ summary: "Get the elderly user's vault (for family members)" }),
    (0, swagger_1.ApiParam)({ name: 'elderlyUserId', description: 'Elderly user ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Vault contents and stats',
        type: dto_1.VaultResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Not a member of this family group',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, common_1.Param)('elderlyUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FamilyController.prototype, "getVault", null);
exports.FamilyController = FamilyController = __decorate([
    (0, swagger_1.ApiTags)('family'),
    (0, common_1.Controller)('family'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
//# sourceMappingURL=family.controller.js.map