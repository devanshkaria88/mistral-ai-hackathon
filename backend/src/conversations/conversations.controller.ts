import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import {
  StartConversationDto,
  StartConversationResponseDto,
  EndConversationResponseDto,
  ConversationResponseDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('conversations')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Start a new conversation session',
    description: 'For voice-first UI: Companion mode for elderly users, Persona mode for family members talking to elderly persona'
  })
  @ApiResponse({
    status: 201,
    description: 'Conversation session started with ElevenLabs session URL',
    type: StartConversationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid mode or missing elderlyUserId for persona mode',
    type: ErrorResponseDto,
  })
  async startConversation(
    @CurrentUser() user: User,
    @Body() dto: StartConversationDto,
  ): Promise<StartConversationResponseDto> {
    return this.conversationsService.startConversation(user.id, dto);
  }

  @Post(':id/end')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'End a conversation and trigger processing' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Conversation ended, processing started',
    type: EndConversationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async endConversation(
    @Param('id') id: string,
  ): Promise<EndConversationResponseDto> {
    return this.conversationsService.endConversation(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all conversations for the current user' })
  @ApiResponse({
    status: 200,
    description: 'List of conversations',
    type: [ConversationResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async findAll(
    @CurrentUser() user: User,
  ): Promise<ConversationResponseDto[]> {
    return this.conversationsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single conversation with extracted stories' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Conversation details',
    type: ConversationResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation not found',
    type: ErrorResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<ConversationResponseDto> {
    return this.conversationsService.findOne(id);
  }
}
