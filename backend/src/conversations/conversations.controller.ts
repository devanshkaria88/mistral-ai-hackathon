import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
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
  PresignedUrlResponseDto,
  UpdateElevenLabsIdDto,
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

  @Patch(':id/elevenlabs-id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Update ElevenLabs conversation ID',
    description: 'Called by mobile app when ElevenLabs session connects and returns the real conversation ID'
  })
  @ApiParam({ name: 'id', description: 'Our internal conversation ID' })
  @ApiResponse({
    status: 204,
    description: 'ElevenLabs ID updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation not found',
    type: ErrorResponseDto,
  })
  async updateElevenLabsId(
    @Param('id') id: string,
    @Body() dto: UpdateElevenLabsIdDto,
  ): Promise<void> {
    return this.conversationsService.updateElevenLabsId(id, dto.elevenLabsConversationId);
  }

  @Get()
  @ApiOperation({ summary: 'List all companion conversations for the current user' })
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

  @Get('persona/:personaUserId')
  @ApiOperation({ 
    summary: 'List all persona conversations with a specific family member',
    description: 'Returns conversations where the current user talked to the specified family member\'s persona'
  })
  @ApiParam({ name: 'personaUserId', description: 'The user ID of the family member whose persona was called' })
  @ApiResponse({
    status: 200,
    description: 'List of persona conversations',
    type: [ConversationResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async findPersonaConversations(
    @CurrentUser() user: User,
    @Param('personaUserId') personaUserId: string,
  ): Promise<ConversationResponseDto[]> {
    return this.conversationsService.findPersonaConversations(user.id, personaUserId);
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

  @Get(':id/audio-url')
  @ApiOperation({ summary: 'Get presigned URL for conversation audio' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL for audio access',
    type: PresignedUrlResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation or audio not found',
    type: ErrorResponseDto,
  })
  async getAudioUrl(@Param('id') id: string): Promise<PresignedUrlResponseDto> {
    return this.conversationsService.getAudioPresignedUrl(id);
  }

  @Get(':id/transcript-url')
  @ApiOperation({ summary: 'Get presigned URL for conversation transcript' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL for transcript access',
    type: PresignedUrlResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation or transcript not found',
    type: ErrorResponseDto,
  })
  async getTranscriptUrl(@Param('id') id: string): Promise<PresignedUrlResponseDto> {
    return this.conversationsService.getTranscriptPresignedUrl(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a conversation' })
  @ApiParam({ name: 'id', description: 'Conversation ID' })
  @ApiResponse({
    status: 200,
    description: 'Conversation deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Conversation not found',
    type: ErrorResponseDto,
  })
  async deleteConversation(
    @CurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    await this.conversationsService.deleteConversation(user.id, id);
    return { message: 'Conversation deleted successfully' };
  }
}
