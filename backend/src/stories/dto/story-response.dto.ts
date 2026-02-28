import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PersonResponseDto } from './person-response.dto';
import { PlaceResponseDto } from './place-response.dto';
import { ThemeResponseDto } from './theme-response.dto';

export class StoryResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the story',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the story',
    example: 'Meeting Arthur at the Dance Hall',
  })
  title: string;

  @ApiProperty({
    description: 'Full narrative content of the story',
    example: "It was 1962, and I was just nineteen. My friend Betty dragged me to the Palais dance hall...",
  })
  content: string;

  @ApiPropertyOptional({
    description: 'URL to the audio version in cloned voice',
    example: 'https://storage.example.com/tts/story123.mp3',
  })
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'Time period the story relates to',
    example: '1962',
  })
  timePeriod?: string;

  @ApiPropertyOptional({
    description: 'Emotional tone of the story',
    example: 'nostalgic',
  })
  emotionalTone?: string;

  @ApiProperty({
    description: 'User ID of the elderly person',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'Conversation ID this story was extracted from',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  conversationId?: string;

  @ApiProperty({
    description: 'When the story was created',
    example: '2026-02-28T14:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'People mentioned in this story',
    type: [PersonResponseDto],
  })
  people: PersonResponseDto[];

  @ApiProperty({
    description: 'Places mentioned in this story',
    type: [PlaceResponseDto],
  })
  places: PlaceResponseDto[];

  @ApiProperty({
    description: 'Themes associated with this story',
    type: [ThemeResponseDto],
  })
  themes: ThemeResponseDto[];
}
