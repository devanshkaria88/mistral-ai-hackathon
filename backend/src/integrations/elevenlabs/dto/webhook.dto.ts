import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum WebhookEventType {
  CONVERSATION_ENDED = 'conversation_ended',
  CONVERSATION_STARTED = 'conversation_started',
}

export class TranscriptMessageDto {
  @ApiProperty({ description: 'Role of the speaker', example: 'user' })
  @IsString()
  role: string;

  @ApiProperty({ description: 'Message content', example: 'Hello, how are you?' })
  @IsString()
  message: string;

  @ApiPropertyOptional({ description: 'Timestamp in seconds' })
  @IsNumber()
  @IsOptional()
  timestamp?: number;
}

export class ConversationMetadataDto {
  @ApiPropertyOptional({ description: 'Duration of conversation in seconds' })
  @IsNumber()
  @IsOptional()
  duration_seconds?: number;

  @ApiPropertyOptional({ description: 'Number of turns in conversation' })
  @IsNumber()
  @IsOptional()
  turn_count?: number;
}

export class ElevenLabsWebhookDto {
  @ApiProperty({ 
    description: 'Type of webhook event',
    enum: WebhookEventType,
    example: WebhookEventType.CONVERSATION_ENDED,
  })
  @IsString()
  @IsOptional()
  event_type?: string;

  @ApiProperty({ description: 'ElevenLabs conversation ID' })
  @IsString()
  @IsOptional()
  conversation_id?: string;

  @ApiPropertyOptional({ description: 'Agent ID used in conversation' })
  @IsString()
  @IsOptional()
  agent_id?: string;

  @ApiPropertyOptional({ description: 'Full transcript as array of messages' })
  @IsOptional()
  transcript?: any[];

  @ApiPropertyOptional({ description: 'Full transcript as plain text' })
  @IsString()
  @IsOptional()
  transcript_text?: string;

  @ApiPropertyOptional({ description: 'URL to download the audio recording' })
  @IsString()
  @IsOptional()
  audio_url?: string;

  @ApiPropertyOptional({ description: 'Conversation metadata' })
  @IsOptional()
  metadata?: any;

  @ApiPropertyOptional({ description: 'Dynamic variables passed to the agent' })
  @IsOptional()
  dynamic_variables?: any;

  // Allow any additional fields ElevenLabs might send
  [key: string]: any;
}

export class WebhookResponseDto {
  @ApiProperty({ description: 'Whether the webhook was processed successfully' })
  success: boolean;

  @ApiPropertyOptional({ description: 'Message describing the result' })
  message?: string;

  @ApiPropertyOptional({ description: 'Internal conversation ID' })
  conversationId?: string;

  @ApiPropertyOptional({ description: 'S3 key for stored audio' })
  audioKey?: string;

  @ApiPropertyOptional({ description: 'S3 key for stored transcript' })
  transcriptKey?: string;
}
