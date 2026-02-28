"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let StoriesService = StoriesService_1 = class StoriesService {
    logger = new common_1.Logger(StoriesService_1.name);
    getMockStory(overrides = {}) {
        return {
            id: (0, uuid_1.v4)(),
            title: 'Meeting Arthur at the Dance Hall',
            content: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall that Saturday night. I didn't want to go - I was shy and didn't know how to dance properly. But there he was, Arthur, standing by the band with his friends. He had the kindest eyes I'd ever seen. When he asked me to dance, I nearly said no, but something made me take his hand. We danced three songs in a row, and by the end of the night, I knew he was special.",
            audioUrl: 'https://storage.example.com/tts/story1.mp3',
            timePeriod: '1962',
            emotionalTone: 'nostalgic',
            userId: (0, uuid_1.v4)(),
            conversationId: (0, uuid_1.v4)(),
            createdAt: new Date('2026-02-27T10:30:00Z'),
            people: [
                { id: (0, uuid_1.v4)(), name: 'Arthur', relationship: 'husband' },
                { id: (0, uuid_1.v4)(), name: 'Betty', relationship: 'friend' },
            ],
            places: [
                { id: (0, uuid_1.v4)(), name: 'Palais Dance Hall', description: 'Local dance venue in London' },
            ],
            themes: [
                { id: (0, uuid_1.v4)(), name: 'Love', slug: 'love' },
                { id: (0, uuid_1.v4)(), name: 'Youth', slug: 'youth' },
            ],
            ...overrides,
        };
    }
    async findAll(userId, query) {
        this.logger.log(`Fetching stories for user: ${userId}, filters: ${JSON.stringify(query)}`);
        return [
            this.getMockStory(),
            this.getMockStory({
                title: "Sarah's Birth",
                content: "Sarah was born on a beautiful spring morning in 1968. Arthur was pacing the hospital corridor...",
                timePeriod: '1968',
                emotionalTone: 'joyful',
                people: [
                    { id: (0, uuid_1.v4)(), name: 'Arthur', relationship: 'husband' },
                    { id: (0, uuid_1.v4)(), name: 'Sarah', relationship: 'daughter' },
                ],
                themes: [
                    { id: (0, uuid_1.v4)(), name: 'Family', slug: 'family' },
                    { id: (0, uuid_1.v4)(), name: 'Joy', slug: 'joy' },
                ],
            }),
            this.getMockStory({
                title: 'Our First Home',
                content: "We bought our first home in 1965, a little terraced house on Maple Street...",
                timePeriod: '1965',
                emotionalTone: 'proud',
                themes: [
                    { id: (0, uuid_1.v4)(), name: 'Home', slug: 'home' },
                    { id: (0, uuid_1.v4)(), name: 'Achievement', slug: 'achievement' },
                ],
            }),
        ];
    }
    async findOne(storyId) {
        this.logger.log(`Fetching story: ${storyId}`);
        return this.getMockStory({ id: storyId });
    }
    async search(userId, query) {
        this.logger.log(`Searching stories for user: ${userId}, query: ${query}`);
        return [this.getMockStory()];
    }
    async getTimeline(userId) {
        this.logger.log(`Fetching timeline for user: ${userId}`);
        return {
            timeline: [
                {
                    period: '1960s',
                    stories: [
                        this.getMockStory({ timePeriod: '1962' }),
                        this.getMockStory({ title: 'Our First Home', timePeriod: '1965' }),
                        this.getMockStory({ title: "Sarah's Birth", timePeriod: '1968' }),
                    ],
                },
                {
                    period: '1970s',
                    stories: [
                        this.getMockStory({ title: 'Family Holiday to Cornwall', timePeriod: '1975' }),
                    ],
                },
            ],
        };
    }
    async toggleBookmark(storyId, userId) {
        this.logger.log(`Toggling bookmark for story: ${storyId}, user: ${userId}`);
        return { bookmarked: true };
    }
    async getThemes() {
        return [
            { id: (0, uuid_1.v4)(), name: 'Love', slug: 'love' },
            { id: (0, uuid_1.v4)(), name: 'Family', slug: 'family' },
            { id: (0, uuid_1.v4)(), name: 'Work', slug: 'work' },
            { id: (0, uuid_1.v4)(), name: 'Travel', slug: 'travel' },
            { id: (0, uuid_1.v4)(), name: 'Childhood', slug: 'childhood' },
            { id: (0, uuid_1.v4)(), name: 'War', slug: 'war' },
            { id: (0, uuid_1.v4)(), name: 'Achievement', slug: 'achievement' },
            { id: (0, uuid_1.v4)(), name: 'Loss', slug: 'loss' },
        ];
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = StoriesService_1 = __decorate([
    (0, common_1.Injectable)()
], StoriesService);
//# sourceMappingURL=stories.service.js.map