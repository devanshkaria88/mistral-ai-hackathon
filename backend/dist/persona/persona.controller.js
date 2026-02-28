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
exports.PersonaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const persona_service_1 = require("./persona.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const error_response_dto_1 = require("../common/dto/error-response.dto");
let PersonaController = class PersonaController {
    personaService;
    constructor(personaService) {
        this.personaService = personaService;
    }
    async askPersona(user, dto) {
        return this.personaService.askPersona(user.id, dto.elderlyUserId, dto.question);
    }
    async getHistory(user, query) {
        return this.personaService.getHistory(user.id, query.elderlyUserId);
    }
};
exports.PersonaController = PersonaController;
__decorate([
    (0, common_1.Post)('ask'),
    (0, swagger_1.ApiOperation)({ summary: 'Ask a question to the elderly persona' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Persona response with source stories',
        type: dto_1.PersonaResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
        type: error_response_dto_1.ErrorResponseDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        dto_1.AskPersonaDto]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "askPersona", null);
__decorate([
    (0, common_1.Get)('history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get conversation history with persona' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of previous persona interactions',
        type: [dto_1.PersonaMessageResponseDto],
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
        dto_1.PersonaHistoryQueryDto]),
    __metadata("design:returntype", Promise)
], PersonaController.prototype, "getHistory", null);
exports.PersonaController = PersonaController = __decorate([
    (0, swagger_1.ApiTags)('persona'),
    (0, common_1.Controller)('persona'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [persona_service_1.PersonaService])
], PersonaController);
//# sourceMappingURL=persona.controller.js.map