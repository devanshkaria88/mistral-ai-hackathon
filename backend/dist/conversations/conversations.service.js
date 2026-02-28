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
var ConversationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const conversation_status_enum_1 = require("../common/types/conversation-status.enum");
const dto_1 = require("./dto");
const elevenlabs_service_1 = require("../integrations/elevenlabs/elevenlabs.service");
let ConversationsService = ConversationsService_1 = class ConversationsService {
    elevenLabsService;
    logger = new common_1.Logger(ConversationsService_1.name);
    constructor(elevenLabsService) {
        this.elevenLabsService = elevenLabsService;
    }
    async startConversation(userId, dto) {
        this.logger.log(`Starting ${dto.mode} conversation for user: ${userId}`);
        if (dto.mode === dto_1.ConversationMode.PERSONA && !dto.elderlyUserId) {
            throw new common_1.BadRequestException('elderlyUserId is required for persona mode');
        }
        let session;
        const conversationId = (0, uuid_1.v4)();
        if (dto.mode === dto_1.ConversationMode.COMPANION) {
            const config = {
                type: elevenlabs_service_1.AgentType.COMPANION,
                dynamicVariables: {
                    user_name: 'Margaret',
                    user_age: '82',
                    context_block: 'Margaret lives in Devon. She was a teacher for 30 years. She has two children, Sarah and Tom.',
                    stories_summary: 'Previously shared: Meeting Arthur at the dance hall (1962), Wedding day (1964)',
                    exploration_suggestions: 'Ask about: Teaching career, Childhood in Devon, Her mother',
                },
                firstMessage: "Hello Margaret! It's lovely to talk with you again. How are you feeling today?",
            };
            session = await this.elevenLabsService.createCompanionSession(config);
        }
        else {
            const config = {
                type: elevenlabs_service_1.AgentType.PERSONA,
                dynamicVariables: {
                    elderly_name: 'Margaret',
                    personality_block: 'Warm, gentle, quietly witty. Gets emotional about Arthur but always positive.',
                    stories_block: 'Story 1: Met Arthur at Palais dance hall, 1962...\nStory 2: Wedding day, 1964...',
                    people_block: 'Arthur (husband, deceased), Sarah (daughter), Tom (son), Betty (best friend)',
                    speech_patterns: 'Uses "love" and "dear". Says "well, I never" and "isn\'t that something"',
                },
                clonedVoiceId: 'voice_clone_abc123',
                firstMessage: "Hello love! It's so wonderful to hear from you. What would you like to know?",
            };
            session = await this.elevenLabsService.createPersonaSession(config);
        }
        return {
            conversationId,
            sessionUrl: session.sessionUrl,
        };
    }
    async endConversation(conversationId) {
        this.logger.log(`Ending conversation: ${conversationId}`);
        return {
            status: 'processing',
        };
    }
    async findAll(userId) {
        this.logger.log(`Fetching conversations for user: ${userId}`);
        return [
            {
                id: (0, uuid_1.v4)(),
                userId,
                status: conversation_status_enum_1.ConversationStatus.PROCESSED,
                transcript: "Margaret: Let me tell you about when I met Arthur...",
                audioUrl: 'https://storage.example.com/audio/conv1.mp3',
                createdAt: new Date('2026-02-27T10:00:00Z'),
                updatedAt: new Date('2026-02-27T10:30:00Z'),
                storiesCount: 2,
            },
            {
                id: (0, uuid_1.v4)(),
                userId,
                status: conversation_status_enum_1.ConversationStatus.PROCESSED,
                transcript: "Margaret: Sarah was born on a beautiful spring morning...",
                audioUrl: 'https://storage.example.com/audio/conv2.mp3',
                createdAt: new Date('2026-02-26T14:00:00Z'),
                updatedAt: new Date('2026-02-26T14:45:00Z'),
                storiesCount: 1,
            },
        ];
    }
    async findOne(conversationId) {
        this.logger.log(`Fetching conversation: ${conversationId}`);
        return {
            id: conversationId,
            userId: (0, uuid_1.v4)(),
            status: conversation_status_enum_1.ConversationStatus.PROCESSED,
            transcript: "Margaret: Let me tell you about when I met Arthur. It was 1962, at the Palais dance hall...",
            audioUrl: 'https://storage.example.com/audio/conv1.mp3',
            createdAt: new Date('2026-02-27T10:00:00Z'),
            updatedAt: new Date('2026-02-27T10:30:00Z'),
            storiesCount: 2,
        };
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = ConversationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elevenlabs_service_1.ElevenLabsService])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map