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
var BedrockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrockService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let BedrockService = BedrockService_1 = class BedrockService {
    configService;
    logger = new common_1.Logger(BedrockService_1.name);
    credentials;
    constructor(configService) {
        this.configService = configService;
        this.credentials = {
            accessKeyId: this.configService.get('aws.accessKeyId'),
            secretAccessKey: this.configService.get('aws.secretAccessKey'),
            sessionToken: this.configService.get('aws.sessionToken'),
        };
    }
    async extractStories(transcript) {
        this.logger.log(`Extracting stories from transcript (${transcript.length} chars)`);
        return [
            {
                title: 'Meeting Arthur at the Dance Hall',
                content: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall on a Saturday night. I didn't want to go, but she insisted. That's where I saw Arthur for the first time. He was standing by the bar, looking nervous in his best suit. When our eyes met, I knew. He asked me to dance, and I said yes. We danced every Saturday after that.",
                timePeriod: '1962',
                emotionalTone: 'nostalgic',
                people: [
                    { name: 'Arthur', relationship: 'husband' },
                    { name: 'Betty', relationship: 'friend' },
                ],
                places: [{ name: 'Palais Dance Hall', description: 'Local dance venue in London' }],
                themes: ['love', 'youth'],
            },
            {
                title: 'The Day Sarah Was Born',
                content: "Arthur was pacing the corridor like a madman. The nurses kept telling him to sit down, but he couldn't. When they finally let him in and he saw Sarah for the first time, this big strong man just burst into tears. He held her so gently, like she was made of glass. That was the happiest day of our lives.",
                timePeriod: '1968',
                emotionalTone: 'joyful',
                people: [
                    { name: 'Arthur', relationship: 'husband' },
                    { name: 'Sarah', relationship: 'daughter' },
                ],
                places: [{ name: "St. Mary's Hospital", description: 'Where Sarah was born' }],
                themes: ['family', 'love'],
            },
        ];
    }
    async generateEmbedding(text) {
        this.logger.log(`Generating embedding for text (${text.length} chars)`);
        return Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
    }
    async generatePersonaResponse(question, context, systemPrompt) {
        this.logger.log(`Generating persona response for: "${question}"`);
        return `Based on what I shared with you about my life... ${question.includes('Arthur') ? "Arthur was the love of my life. We met at the Palais dance hall in 1962, and from that first dance, I knew he was the one. He had the kindest eyes and the gentlest hands." : "Oh, that takes me back. Let me tell you about those days..."}`;
    }
};
exports.BedrockService = BedrockService;
exports.BedrockService = BedrockService = BedrockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BedrockService);
//# sourceMappingURL=bedrock.service.js.map