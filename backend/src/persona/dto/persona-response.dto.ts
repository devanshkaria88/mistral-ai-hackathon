import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StoryResponseDto } from '../../stories/dto/story-response.dto';

export class PersonaResponseDto {
  @ApiProperty({
    description: 'The persona response text',
    example: "Oh, our wedding day! It was June 15th, 1964. Arthur was so nervous he nearly forgot the ring...",
  })
  response: string;

  @ApiPropertyOptional({
    description: 'URL to the audio response in cloned voice',
    example: 'https://storage.example.com/tts/persona123.mp3',
  })
  audioUrl?: string;

  @ApiProperty({
    description: 'Source stories used to generate this response',
    type: [StoryResponseDto],
  })
  sourceStories: StoryResponseDto[];
}
