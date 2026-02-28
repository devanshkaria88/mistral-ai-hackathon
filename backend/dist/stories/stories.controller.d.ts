import { StoriesService } from './stories.service';
import { StoryResponseDto, StoryFilterQueryDto, SearchQueryDto, TimelineResponseDto, BookmarkResponseDto, ThemeResponseDto } from './dto';
import { User } from '../users/user.entity';
export declare class StoriesController {
    private readonly storiesService;
    constructor(storiesService: StoriesService);
    findAll(user: User, query: StoryFilterQueryDto): Promise<StoryResponseDto[]>;
    search(user: User, query: SearchQueryDto): Promise<StoryResponseDto[]>;
    getTimeline(user: User): Promise<TimelineResponseDto>;
    getThemes(): Promise<ThemeResponseDto[]>;
    findOne(id: string): Promise<StoryResponseDto>;
    toggleBookmark(id: string, user: User): Promise<BookmarkResponseDto>;
}
