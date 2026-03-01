import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  StoryResponseDto,
  StoryFilterQueryDto,
  TimelineResponseDto,
  BookmarkResponseDto,
  ThemeResponseDto,
} from './dto';
import { Story } from './story.entity';
import { Person, Place, Theme } from './entities';
import { ExtractedStory } from '../integrations/mistral/mistral.service';

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {}

  private toResponseDto(story: Story): StoryResponseDto {
    return {
      id: story.id,
      title: story.title,
      content: story.content,
      audioUrl: story.audioUrl,
      timePeriod: story.timePeriod,
      emotionalTone: story.emotionalTone,
      userId: story.userId,
      conversationId: story.conversationId,
      createdAt: story.createdAt,
      people: (story.people || []).map(p => ({
        id: p.id,
        name: p.name,
        relationship: p.relationship,
      })),
      places: (story.places || []).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
      themes: (story.themes || []).map(t => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
      })),
    };
  }

  async findAll(userId: string, query: StoryFilterQueryDto): Promise<StoryResponseDto[]> {
    this.logger.log(`Fetching stories for user: ${userId}, filters: ${JSON.stringify(query)}`);
    
    const queryBuilder = this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.people', 'people')
      .leftJoinAndSelect('story.places', 'places')
      .leftJoinAndSelect('story.themes', 'themes')
      .where('story.userId = :userId', { userId })
      .andWhere('story.deletedAt IS NULL')
      .orderBy('story.createdAt', 'DESC');

    if (query.themeSlug) {
      queryBuilder.andWhere('themes.slug = :themeSlug', { themeSlug: query.themeSlug });
    }

    if (query.timePeriod) {
      queryBuilder.andWhere('story.timePeriod = :timePeriod', { timePeriod: query.timePeriod });
    }

    const stories = await queryBuilder.getMany();
    return stories.map(s => this.toResponseDto(s));
  }

  async findOne(storyId: string): Promise<StoryResponseDto> {
    this.logger.log(`Fetching story: ${storyId}`);
    
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
      relations: ['people', 'places', 'themes'],
    });

    if (!story) {
      throw new NotFoundException(`Story ${storyId} not found`);
    }

    return this.toResponseDto(story);
  }

  async findAllWithRelations(userId: string): Promise<Story[]> {
    this.logger.log(`Fetching all stories with relations for user: ${userId}`);
    
    return this.storyRepository.find({
      where: { userId, deletedAt: null as any },
      relations: ['people', 'places', 'themes'],
      order: { createdAt: 'DESC' },
    });
  }

  async search(userId: string, query: string): Promise<StoryResponseDto[]> {
    this.logger.log(`Searching stories for user: ${userId}, query: ${query}`);
    
    // Basic text search - TODO: implement semantic search with embeddings
    const stories = await this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.people', 'people')
      .leftJoinAndSelect('story.places', 'places')
      .leftJoinAndSelect('story.themes', 'themes')
      .where('story.userId = :userId', { userId })
      .andWhere('story.deletedAt IS NULL')
      .andWhere(
        '(story.title ILIKE :query OR story.content ILIKE :query)',
        { query: `%${query}%` },
      )
      .orderBy('story.createdAt', 'DESC')
      .getMany();

    return stories.map(s => this.toResponseDto(s));
  }

  async getTimeline(userId: string): Promise<TimelineResponseDto> {
    this.logger.log(`Fetching timeline for user: ${userId}`);
    
    const stories = await this.storyRepository
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.people', 'people')
      .leftJoinAndSelect('story.places', 'places')
      .leftJoinAndSelect('story.themes', 'themes')
      .where('story.userId = :userId', { userId })
      .andWhere('story.deletedAt IS NULL')
      .andWhere('story.timePeriod IS NOT NULL')
      .orderBy('story.timePeriod', 'ASC')
      .getMany();

    // Group stories by decade
    const groupedByDecade = new Map<string, StoryResponseDto[]>();
    for (const story of stories) {
      const year = parseInt(story.timePeriod || '0', 10);
      const decade = year >= 1900 ? `${Math.floor(year / 10) * 10}s` : 'Unknown';
      
      if (!groupedByDecade.has(decade)) {
        groupedByDecade.set(decade, []);
      }
      groupedByDecade.get(decade)!.push(this.toResponseDto(story));
    }

    const timeline = Array.from(groupedByDecade.entries()).map(([period, stories]) => ({
      period,
      stories,
    }));

    return { timeline };
  }

  async toggleBookmark(storyId: string, userId: string): Promise<BookmarkResponseDto> {
    this.logger.log(`Toggling bookmark for story: ${storyId}, user: ${userId}`);
    // TODO: Implement bookmark functionality with a bookmarks table
    return { bookmarked: true };
  }

  async getThemes(): Promise<ThemeResponseDto[]> {
    const themes = await this.themeRepository.find();
    
    if (themes.length === 0) {
      // Return default themes if none exist
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

    return themes.map(t => ({ id: t.id, name: t.name, slug: t.slug }));
  }

  /**
   * Create stories from extracted data (called by webhook service)
   */
  async createFromExtracted(
    userId: string,
    conversationId: string,
    extractedStories: ExtractedStory[],
  ): Promise<Story[]> {
    this.logger.log(`Creating ${extractedStories.length} stories for user ${userId} from conversation ${conversationId}`);

    const createdStories: Story[] = [];

    for (const extracted of extractedStories) {
      try {
        // Find or create themes
        const themes: Theme[] = [];
        for (const themeName of extracted.themes || []) {
          const slug = themeName.toLowerCase().replace(/\s+/g, '-');
          let theme = await this.themeRepository.findOne({ where: { slug } });
          if (!theme) {
            theme = this.themeRepository.create({ name: themeName, slug });
            theme = await this.themeRepository.save(theme);
          }
          themes.push(theme);
        }

        // Find or create people
        const people: Person[] = [];
        for (const personData of extracted.people || []) {
          let person = await this.personRepository.findOne({
            where: { name: personData.name, userId },
          });
          if (!person) {
            person = this.personRepository.create({
              name: personData.name,
              relationship: personData.relationship,
              userId,
            });
            person = await this.personRepository.save(person);
          }
          people.push(person);
        }

        // Find or create places
        const places: Place[] = [];
        for (const placeData of extracted.places || []) {
          let place = await this.placeRepository.findOne({
            where: { name: placeData.name, userId },
          });
          if (!place) {
            place = this.placeRepository.create({
              name: placeData.name,
              description: placeData.description,
              userId,
            });
            place = await this.placeRepository.save(place);
          }
          places.push(place);
        }

        // Create the story
        const story = this.storyRepository.create({
          title: extracted.title,
          content: extracted.content,
          timePeriod: extracted.timePeriod,
          emotionalTone: extracted.emotionalTone,
          userId,
          conversationId,
          themes,
          people,
          places,
        });

        const savedStory = await this.storyRepository.save(story);
        createdStories.push(savedStory);
        this.logger.log(`Created story: "${savedStory.title}" (${savedStory.id})`);
      } catch (error) {
        this.logger.error(`Failed to create story "${extracted.title}": ${error.message}`);
      }
    }

    return createdStories;
  }

  async deleteStory(userId: string, storyId: string): Promise<void> {
    this.logger.log(`Deleting story ${storyId} for user ${userId}`);

    const story = await this.storyRepository.findOne({
      where: { id: storyId, userId },
    });

    if (!story) {
      throw new NotFoundException(`Story ${storyId} not found`);
    }

    // Soft delete the story
    await this.storyRepository.softDelete(storyId);
    this.logger.log(`Story ${storyId} deleted successfully`);
  }
}
