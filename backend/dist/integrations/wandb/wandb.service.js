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
var WandbService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WandbService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let WandbService = WandbService_1 = class WandbService {
    configService;
    logger = new common_1.Logger(WandbService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async traceExtraction(input, output) {
        this.logger.log('Tracing extraction pipeline');
        this.logger.debug('Input:', JSON.stringify(input, null, 2));
        this.logger.debug('Output:', JSON.stringify(output, null, 2));
    }
    async tracePersona(input, output) {
        this.logger.log('Tracing persona pipeline');
        this.logger.debug('Input:', JSON.stringify(input, null, 2));
        this.logger.debug('Output:', JSON.stringify(output, null, 2));
    }
};
exports.WandbService = WandbService;
exports.WandbService = WandbService = WandbService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WandbService);
//# sourceMappingURL=wandb.service.js.map