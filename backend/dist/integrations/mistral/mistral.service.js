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
var MistralService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MistralService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let MistralService = MistralService_1 = class MistralService {
    configService;
    logger = new common_1.Logger(MistralService_1.name);
    apiKey;
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('mistral.apiKey') || '';
    }
    async generateExplorationSuggestions(collectedStories, userContext) {
        this.logger.log('Generating exploration suggestions with Mistral');
        return [
            {
                topic: 'Childhood in Devon',
                reason: "Margaret mentioned growing up near the coast but hasn't shared specific memories",
                suggestedQuestion: "You mentioned growing up in Devon near the coast. What was that like as a child?",
            },
            {
                topic: "Mother's story",
                reason: "The wedding dress belonged to her mother - there's likely a deeper story there",
                suggestedQuestion: "You wore your mother's dress at your wedding. What was she like?",
            },
            {
                topic: 'Teaching career',
                reason: "30 years of teaching but only briefly mentioned",
                suggestedQuestion: "You taught for 30 years - do you remember any students who really stood out?",
            },
        ];
    }
    async extractPersonalityProfile(transcripts) {
        this.logger.log('Extracting personality profile with Mistral');
        return {
            traits: ['warm', 'gentle', 'quietly witty', 'deflects compliments', 'family-focused'],
            speechPatterns: [
                'Starts stories with "Now, this was back when..."',
                'Uses "love" and "dear" as terms of address',
                'Speaks in relatively short sentences',
                'Often ends stories with a moral or lesson',
            ],
            keyPhrases: [
                'well, I never',
                "isn't that something",
                'Oh, it was nothing really',
                'getting on with it',
            ],
            emotionalTendencies: 'Gets emotional when talking about Arthur but always follows with something positive. Lights up when talking about family.',
        };
    }
    async extractStoriesFromTranscript(transcript) {
        this.logger.log(`Extracting stories from transcript (${transcript.length} chars)`);
        return [
            {
                title: 'Meeting Arthur at the Dance Hall',
                content: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall on a Saturday night. I didn't want to go, but she insisted. That's where I saw Arthur for the first time. He was standing by the bar, looking nervous in his best suit. When our eyes met, I knew. He asked me to dance, and I said yes. We danced every Saturday after that.",
                timePeriod: '1962',
                emotionalTone: 'nostalgic, romantic',
                people: [
                    { name: 'Arthur', relationship: 'husband' },
                    { name: 'Betty', relationship: 'friend' },
                ],
                places: [{ name: 'Palais Dance Hall', description: 'Local dance venue' }],
                themes: ['love', 'youth', 'romance'],
            },
        ];
    }
    async generateFirstMessage(userName, conversationHistory, lastStoryTopic) {
        this.logger.log(`Generating first message for ${userName}`);
        if (conversationHistory.length === 0) {
            return `Hello ${userName}, I'm Evie. I'm so glad we get to chat. I'd love to hear a little about you — whatever comes to mind. What's been on your mind today?`;
        }
        if (lastStoryTopic) {
            return `Hello ${userName}! Last time you were telling me about ${lastStoryTopic}. I couldn't stop thinking about it. Would you like to tell me more about that?`;
        }
        return `${userName}, hello! How are you today? I was thinking about our last conversation and I'd love to hear more about your life.`;
    }
    async generatePersonaResponse(question, stories, personalityProfile) {
        this.logger.log(`Generating persona response for: "${question}"`);
        return {
            response: "Oh, Arthur. He was the love of my life, he really was. We met at the Palais dance hall in 1962 — I was just nineteen. My friend Betty had dragged me there, and I wasn't keen on going at all. But then I saw him standing by the bar, looking so nervous in his best suit. When our eyes met, I just knew. He asked me to dance and stepped on my feet three times. I married him anyway. Best decision I ever made.",
            sourceStoryIndices: [0],
        };
    }
    async generateEmbedding(text) {
        this.logger.log(`Generating embedding for text (${text.length} chars)`);
        return Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
    }
};
exports.MistralService = MistralService;
exports.MistralService = MistralService = MistralService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MistralService);
//# sourceMappingURL=mistral.service.js.map