"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsModule = void 0;
const common_1 = require("@nestjs/common");
const bedrock_module_1 = require("./bedrock/bedrock.module");
const elevenlabs_module_1 = require("./elevenlabs/elevenlabs.module");
const firebase_module_1 = require("./firebase/firebase.module");
const wandb_module_1 = require("./wandb/wandb.module");
const mistral_module_1 = require("./mistral/mistral.module");
let IntegrationsModule = class IntegrationsModule {
};
exports.IntegrationsModule = IntegrationsModule;
exports.IntegrationsModule = IntegrationsModule = __decorate([
    (0, common_1.Module)({
        imports: [bedrock_module_1.BedrockModule, elevenlabs_module_1.ElevenLabsModule, firebase_module_1.FirebaseModule, wandb_module_1.WandbModule, mistral_module_1.MistralModule],
        exports: [bedrock_module_1.BedrockModule, elevenlabs_module_1.ElevenLabsModule, firebase_module_1.FirebaseModule, wandb_module_1.WandbModule, mistral_module_1.MistralModule],
    })
], IntegrationsModule);
//# sourceMappingURL=integrations.module.js.map