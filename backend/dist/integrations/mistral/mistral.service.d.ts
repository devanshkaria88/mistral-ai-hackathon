import { ConfigService } from '@nestjs/config';
export interface ExplorationSuggestion {
    topic: string;
    reason: string;
    suggestedQuestion: string;
}
export interface PersonalityProfile {
    traits: string[];
    speechPatterns: string[];
    keyPhrases: string[];
    emotionalTendencies: string;
}
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
export declare class MistralService {
    private readonly configService;
    private readonly logger;
    private readonly apiKey;
    constructor(configService: ConfigService);
    generateExplorationSuggestions(collectedStories: string[], userContext: string): Promise<ExplorationSuggestion[]>;
    extractPersonalityProfile(transcripts: string[]): Promise<PersonalityProfile>;
    extractStoriesFromTranscript(transcript: string): Promise<ExtractedStory[]>;
    generateFirstMessage(userName: string, conversationHistory: string[], lastStoryTopic?: string): Promise<string>;
    generatePersonaResponse(question: string, stories: string[], personalityProfile: PersonalityProfile): Promise<{
        response: string;
        sourceStoryIndices: number[];
    }>;
    generateEmbedding(text: string): Promise<number[]>;
}
