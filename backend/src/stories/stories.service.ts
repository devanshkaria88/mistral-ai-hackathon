import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  StoryResponseDto,
  StoryFilterQueryDto,
  TimelineResponseDto,
  BookmarkResponseDto,
  ThemeResponseDto,
} from './dto';

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  private getMockStory(overrides: Partial<StoryResponseDto> = {}): StoryResponseDto {
    return {
      id: uuidv4(),
      title: 'Meeting Arthur at the Dance Hall',
      content: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall that Saturday night. I didn't want to go - I was shy and didn't know how to dance properly. But there he was, Arthur, standing by the band with his friends. He had the kindest eyes I'd ever seen. When he asked me to dance, I nearly said no, but something made me take his hand. We danced three songs in a row, and by the end of the night, I knew he was special.",
      audioUrl: 'https://storage.example.com/tts/story1.mp3',
      timePeriod: '1962',
      emotionalTone: 'nostalgic',
      userId: uuidv4(),
      conversationId: uuidv4(),
      createdAt: new Date('2026-02-27T10:30:00Z'),
      people: [
        { id: uuidv4(), name: 'Arthur', relationship: 'husband' },
        { id: uuidv4(), name: 'Betty', relationship: 'friend' },
      ],
      places: [
        { id: uuidv4(), name: 'Palais Dance Hall', description: 'Local dance venue in London' },
      ],
      themes: [
        { id: uuidv4(), name: 'Love', slug: 'love' },
        { id: uuidv4(), name: 'Youth', slug: 'youth' },
      ],
      ...overrides,
    };
  }

  async findAll(userId: string, query: StoryFilterQueryDto): Promise<StoryResponseDto[]> {
    this.logger.log(`Fetching stories for user: ${userId}, filters: ${JSON.stringify(query)}`);
    
    return [
      this.getMockStory(),
      this.getMockStory({
        title: "Sarah's Birth",
        content: "Sarah was born on a beautiful spring morning in 1968. Arthur was pacing the hospital corridor...",
        timePeriod: '1968',
        emotionalTone: 'joyful',
        people: [
          { id: uuidv4(), name: 'Arthur', relationship: 'husband' },
          { id: uuidv4(), name: 'Sarah', relationship: 'daughter' },
        ],
        themes: [
          { id: uuidv4(), name: 'Family', slug: 'family' },
          { id: uuidv4(), name: 'Joy', slug: 'joy' },
        ],
      }),
      this.getMockStory({
        title: 'Our First Home',
        content: "We bought our first home in 1965, a little terraced house on Maple Street...",
        timePeriod: '1965',
        emotionalTone: 'proud',
        themes: [
          { id: uuidv4(), name: 'Home', slug: 'home' },
          { id: uuidv4(), name: 'Achievement', slug: 'achievement' },
        ],
      }),
    ];
  }

  async findOne(storyId: string): Promise<StoryResponseDto> {
    this.logger.log(`Fetching story: ${storyId}`);
    return this.getMockStory({ id: storyId });
  }

  async search(userId: string, query: string): Promise<StoryResponseDto[]> {
    this.logger.log(`Searching stories for user: ${userId}, query: ${query}`);
    
    // Mock semantic search results
    return [this.getMockStory()];
  }

  async getTimeline(userId: string): Promise<TimelineResponseDto> {
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

  async toggleBookmark(storyId: string, userId: string): Promise<BookmarkResponseDto> {
    this.logger.log(`Toggling bookmark for story: ${storyId}, user: ${userId}`);
    return { bookmarked: true };
  }

  async getThemes(): Promise<ThemeResponseDto[]> {
    return [
      { id: uuidv4(), name: 'Love', slug: 'love' },
      { id: uuidv4(), name: 'Family', slug: 'family' },
      { id: uuidv4(), name: 'Work', slug: 'work' },
      { id: uuidv4(), name: 'Travel', slug: 'travel' },
      { id: uuidv4(), name: 'Childhood', slug: 'childhood' },
      { id: uuidv4(), name: 'War', slug: 'war' },
      { id: uuidv4(), name: 'Achievement', slug: 'achievement' },
      { id: uuidv4(), name: 'Loss', slug: 'loss' },
    ];
  }
}
