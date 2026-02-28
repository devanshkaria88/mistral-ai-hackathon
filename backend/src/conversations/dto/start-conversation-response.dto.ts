import { ApiProperty } from '@nestjs/swagger';

export class StartConversationResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the conversation',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  conversationId: string;

  @ApiProperty({
    description: 'ElevenLabs session URL for voice interaction',
    example: 'https://elevenlabs.io/convai/session/abc123',
  })
  sessionUrl: string;
}
