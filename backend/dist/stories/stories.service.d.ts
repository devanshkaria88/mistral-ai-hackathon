import { StoryResponseDto, StoryFilterQueryDto, TimelineResponseDto, BookmarkResponseDto, ThemeResponseDto } from './dto';
export declare class StoriesService {
    private readonly logger;
    private getMockStory;
    findAll(userId: string, query: StoryFilterQueryDto): Promise<StoryResponseDto[]>;
    findOne(storyId: string): Promise<StoryResponseDto>;
    search(userId: string, query: string): Promise<StoryResponseDto[]>;
    getTimeline(userId: string): Promise<TimelineResponseDto>;
    toggleBookmark(storyId: string, userId: string): Promise<BookmarkResponseDto>;
    getThemes(): Promise<ThemeResponseDto[]>;
}
