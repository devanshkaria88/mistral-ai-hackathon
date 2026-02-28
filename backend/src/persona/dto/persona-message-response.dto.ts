import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonaMessageResponseDto {
  @ApiProperty({
    description: 'Message ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'The question asked',
    example: 'What was your wedding day like?',
  })
  question: string;

  @ApiProperty({
    description: 'The persona response',
    example: "Oh, our wedding day! It was June 15th, 1964...",
  })
  response: string;

  @ApiPropertyOptional({
    description: 'URL to the audio response',
    example: 'https://storage.example.com/tts/persona123.mp3',
  })
  responseAudioUrl?: string;

  @ApiProperty({
    description: 'IDs of stories used as context',
    type: [String],
    example: ['550e8400-e29b-41d4-a716-446655440001'],
  })
  sourceStoryIds: string[];

  @ApiProperty({
    description: 'When the message was created',
    example: '2026-02-28T14:30:00Z',
  })
  createdAt: Date;
}
