import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConversationStatus } from '../../common/types/conversation-status.enum';

export class ConversationStoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  timePeriod?: string;

  @ApiPropertyOptional()
  emotionalTone?: string;

  @ApiPropertyOptional({ type: [Object] })
  themes?: { id: string; name: string; slug: string }[];

  @ApiPropertyOptional({ type: [Object] })
  people?: { id: string; name: string; relationship: string }[];

  @ApiPropertyOptional({ type: [Object] })
  places?: { id: string; name: string; description?: string }[];
}

export class ConversationResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the conversation',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User ID of the elderly person',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiProperty({
    description: 'Current status of the conversation',
    enum: ConversationStatus,
    example: ConversationStatus.PROCESSED,
  })
  status: ConversationStatus;

  @ApiPropertyOptional({
    description: 'Full transcript of the conversation',
    example: 'Margaret: Let me tell you about when I met Arthur...',
  })
  transcript?: string;

  @ApiPropertyOptional({
    description: 'URL to the audio recording',
    example: 'https://storage.example.com/audio/conv123.mp3',
  })
  audioUrl?: string;

  @ApiProperty({
    description: 'When the conversation was created',
    example: '2026-02-28T14:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'When the conversation was last updated',
    example: '2026-02-28T15:00:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Number of stories extracted from this conversation',
    example: 3,
  })
  storiesCount: number;

  @ApiPropertyOptional({
    description: 'Stories extracted from this conversation',
    type: [ConversationStoryDto],
  })
  stories?: ConversationStoryDto[];

  @ApiPropertyOptional({
    description: 'Duration of the conversation in minutes',
    example: 15,
  })
  durationMinutes?: number;

  @ApiPropertyOptional({
    description: 'Presigned URL to play the call recording',
    example: 'https://s3.amazonaws.com/bucket/audio.mp3?...',
  })
  recordingUrl?: string;
}
