"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const validation_schema_1 = require("./config/validation.schema");
const common_module_1 = require("./common/common.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const conversations_module_1 = require("./conversations/conversations.module");
const stories_module_1 = require("./stories/stories.module");
const persona_module_1 = require("./persona/persona.module");
const family_module_1 = require("./family/family.module");
const voice_module_1 = require("./voice/voice.module");
const integrations_module_1 = require("./integrations/integrations.module");
const user_entity_1 = require("./users/user.entity");
const family_group_entity_1 = require("./family/family-group.entity");
const conversation_entity_1 = require("./conversations/conversation.entity");
const story_entity_1 = require("./stories/story.entity");
const entities_1 = require("./stories/entities");
const voice_profile_entity_1 = require("./voice/voice-profile.entity");
const persona_message_entity_1 = require("./persona/persona-message.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validationSchema: validation_schema_1.validationSchema,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    entities: [
                        user_entity_1.User,
                        family_group_entity_1.FamilyGroup,
                        conversation_entity_1.Conversation,
                        story_entity_1.Story,
                        entities_1.Person,
                        entities_1.Place,
                        entities_1.Theme,
                        voice_profile_entity_1.VoiceProfile,
                        persona_message_entity_1.PersonaMessage,
                    ],
                    synchronize: false,
                    logging: configService.get('nodeEnv') === 'development',
                    retryAttempts: 3,
                    retryDelay: 3000,
                }),
                inject: [config_1.ConfigService],
            }),
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            conversations_module_1.ConversationsModule,
            stories_module_1.StoriesModule,
            persona_module_1.PersonaModule,
            family_module_1.FamilyModule,
            voice_module_1.VoiceModule,
            integrations_module_1.IntegrationsModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map