"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PersonaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let PersonaService = PersonaService_1 = class PersonaService {
    logger = new common_1.Logger(PersonaService_1.name);
    async askPersona(familyUserId, elderlyUserId, question) {
        this.logger.log(`Persona query from ${familyUserId} about ${elderlyUserId}: ${question}`);
        return {
            response: "Oh, our wedding day! It was June 15th, 1964. Arthur was so nervous he nearly forgot the ring - can you imagine? His best man, Tommy, had to remind him three times to check his pocket. The church was St. Mary's on the hill, where my parents had married too. I wore my mother's dress, altered to fit me. Arthur cried when he saw me walking down the aisle, though he'd never admit it now. We had the reception at the village hall - nothing fancy, but everyone we loved was there. We danced until midnight, and Arthur stepped on my toes at least a dozen times, but I didn't mind one bit.",
            audioUrl: 'https://storage.example.com/tts/persona_response_1.mp3',
            sourceStories: [
                {
                    id: (0, uuid_1.v4)(),
                    title: 'Our Wedding Day',
                    content: "June 15th, 1964 was the happiest day of my life...",
                    timePeriod: '1964',
                    emotionalTone: 'joyful',
                    userId: elderlyUserId,
                    createdAt: new Date('2026-02-25T10:00:00Z'),
                    people: [
                        { id: (0, uuid_1.v4)(), name: 'Arthur', relationship: 'husband' },
                        { id: (0, uuid_1.v4)(), name: 'Tommy', relationship: 'best man' },
                    ],
                    places: [
                        { id: (0, uuid_1.v4)(), name: "St. Mary's Church", description: 'Parish church on the hill' },
                    ],
                    themes: [
                        { id: (0, uuid_1.v4)(), name: 'Love', slug: 'love' },
                        { id: (0, uuid_1.v4)(), name: 'Family', slug: 'family' },
                    ],
                },
            ],
        };
    }
    async getHistory(familyUserId, elderlyUserId) {
        this.logger.log(`Fetching persona history for family user ${familyUserId} about ${elderlyUserId}`);
        return [
            {
                id: (0, uuid_1.v4)(),
                question: 'What was your wedding day like?',
                response: "Oh, our wedding day! It was June 15th, 1964...",
                responseAudioUrl: 'https://storage.example.com/tts/persona_response_1.mp3',
                sourceStoryIds: [(0, uuid_1.v4)()],
                createdAt: new Date('2026-02-28T10:00:00Z'),
            },
            {
                id: (0, uuid_1.v4)(),
                question: 'Tell me about when Sarah was born',
                response: "Sarah came into the world on a beautiful spring morning in 1968...",
                responseAudioUrl: 'https://storage.example.com/tts/persona_response_2.mp3',
                sourceStoryIds: [(0, uuid_1.v4)()],
                createdAt: new Date('2026-02-27T14:00:00Z'),
            },
        ];
    }
};
exports.PersonaService = PersonaService;
exports.PersonaService = PersonaService = PersonaService_1 = __decorate([
    (0, common_1.Injectable)()
], PersonaService);
//# sourceMappingURL=persona.service.js.map