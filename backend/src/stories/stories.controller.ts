import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { StoriesService } from './stories.service';
import {
  StoryResponseDto,
  StoryFilterQueryDto,
  SearchQueryDto,
  TimelineResponseDto,
  BookmarkResponseDto,
  ThemeResponseDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('stories')
@Controller('stories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List stories with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of stories',
    type: [StoryResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async findAll(
    @CurrentUser() user: User,
    @Query() query: StoryFilterQueryDto,
  ): Promise<StoryResponseDto[]> {
    return this.storiesService.findAll(user.id, query);
  }

  @Get('search')
  @ApiOperation({ summary: 'Semantic search across stories' })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: [StoryResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async search(
    @CurrentUser() user: User,
    @Query() query: SearchQueryDto,
  ): Promise<StoryResponseDto[]> {
    return this.storiesService.search(user.id, query.q);
  }

  @Get('timeline')
  @ApiOperation({ summary: 'Get stories grouped by time period' })
  @ApiResponse({
    status: 200,
    description: 'Timeline of stories',
    type: TimelineResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getTimeline(@CurrentUser() user: User): Promise<TimelineResponseDto> {
    return this.storiesService.getTimeline(user.id);
  }

  @Get('themes')
  @ApiOperation({ summary: 'Get all available themes' })
  @ApiResponse({
    status: 200,
    description: 'List of themes',
    type: [ThemeResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getThemes(): Promise<ThemeResponseDto[]> {
    return this.storiesService.getThemes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single story by ID' })
  @ApiParam({ name: 'id', description: 'Story ID' })
  @ApiResponse({
    status: 200,
    description: 'Story details',
    type: StoryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Story not found',
    type: ErrorResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<StoryResponseDto> {
    return this.storiesService.findOne(id);
  }

  @Post(':id/bookmark')
  @ApiOperation({ summary: 'Toggle bookmark on a story' })
  @ApiParam({ name: 'id', description: 'Story ID' })
  @ApiResponse({
    status: 200,
    description: 'Bookmark toggled',
    type: BookmarkResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async toggleBookmark(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<BookmarkResponseDto> {
    return this.storiesService.toggleBookmark(id, user.id);
  }
}
