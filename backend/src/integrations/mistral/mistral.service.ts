import { Injectable, Logger } from '@nestjs/common';
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
  people: Array<{ name: string; relationship?: string }>;
  places: Array<{ name: string; description?: string }>;
  themes: string[];
}

@Injectable()
export class MistralService {
  private readonly logger = new Logger(MistralService.name);
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('mistral.apiKey') || '';
  }

  async generateExplorationSuggestions(
    collectedStories: string[],
    userContext: string,
  ): Promise<ExplorationSuggestion[]> {
    this.logger.log('Generating exploration suggestions with Mistral');

    // TODO: Replace with actual Mistral API call
    // POST https://api.mistral.ai/v1/chat/completions
    // Headers: Authorization: Bearer {apiKey}
    // Body: {
    //   model: "mistral-large-latest",
    //   messages: [
    //     { role: "system", content: "You are an assistant that identifies gaps in life story collection..." },
    //     { role: "user", content: `Context: ${userContext}\n\nStories collected: ${collectedStories.join('\n')}` }
    //   ]
    // }

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

  async extractPersonalityProfile(transcripts: string[]): Promise<PersonalityProfile> {
    this.logger.log('Extracting personality profile with Mistral');

    // TODO: Replace with actual Mistral API call
    // Analyze transcripts to extract personality traits, speech patterns, etc.

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

  async extractStoriesFromTranscript(transcript: string): Promise<ExtractedStory[]> {
    this.logger.log(`Extracting stories from transcript (${transcript.length} chars)`);

    // TODO: Replace with actual Mistral API call
    // Use structured output to extract stories, people, places, themes

    return [
      {
        title: 'Meeting Arthur at the Dance Hall',
        content:
          "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall on a Saturday night. I didn't want to go, but she insisted. That's where I saw Arthur for the first time. He was standing by the bar, looking nervous in his best suit. When our eyes met, I knew. He asked me to dance, and I said yes. We danced every Saturday after that.",
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

  async generateFirstMessage(
    userName: string,
    conversationHistory: string[],
    lastStoryTopic?: string,
  ): Promise<string> {
    this.logger.log(`Generating first message for ${userName}`);

    // TODO: Replace with actual Mistral API call

    if (conversationHistory.length === 0) {
      return `Hello ${userName}, I'm Evie. I'm so glad we get to chat. I'd love to hear a little about you — whatever comes to mind. What's been on your mind today?`;
    }

    if (lastStoryTopic) {
      return `Hello ${userName}! Last time you were telling me about ${lastStoryTopic}. I couldn't stop thinking about it. Would you like to tell me more about that?`;
    }

    return `${userName}, hello! How are you today? I was thinking about our last conversation and I'd love to hear more about your life.`;
  }

  async generatePersonaResponse(
    question: string,
    stories: string[],
    personalityProfile: PersonalityProfile,
  ): Promise<{ response: string; sourceStoryIndices: number[] }> {
    this.logger.log(`Generating persona response for: "${question}"`);

    // TODO: Replace with actual Mistral API call
    // Use RAG to find relevant stories and generate response in the persona's voice

    return {
      response:
        "Oh, Arthur. He was the love of my life, he really was. We met at the Palais dance hall in 1962 — I was just nineteen. My friend Betty had dragged me there, and I wasn't keen on going at all. But then I saw him standing by the bar, looking so nervous in his best suit. When our eyes met, I just knew. He asked me to dance and stepped on my feet three times. I married him anyway. Best decision I ever made.",
      sourceStoryIndices: [0],
    };
  }

  async generateEmbedding(text: string): Promise<number[]> {
    this.logger.log(`Generating embedding for text (${text.length} chars)`);

    // TODO: Replace with actual Mistral embedding API call
    // POST https://api.mistral.ai/v1/embeddings
    // Body: { model: "mistral-embed", input: text }

    return Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
  }
}
