import { ConfigService } from '@nestjs/config';
export interface ExtractedStory {
    title: string;
    content: string;
    timePeriod?: string;
    emotionalTone?: string;
    people: Array<{
        name: string;
        relationship?: string;
    }>;
    places: Array<{
        name: string;
        description?: string;
    }>;
    themes: string[];
}
export declare class BedrockService {
    private readonly configService;
    private readonly logger;
    private readonly credentials;
    constructor(configService: ConfigService);
    extractStories(transcript: string): Promise<ExtractedStory[]>;
    generateEmbedding(text: string): Promise<number[]>;
    generatePersonaResponse(question: string, context: string[], systemPrompt: string): Promise<string>;
}
