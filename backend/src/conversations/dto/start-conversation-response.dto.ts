import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DynamicVariablesDto {
  // Companion mode variables
  @ApiPropertyOptional({ description: 'User display name (companion mode)', example: 'Margaret' })
  user_name?: string;

  @ApiPropertyOptional({ description: 'User age (companion mode)', example: '82' })
  user_age?: string;

  @ApiPropertyOptional({ description: 'Context about the user (companion mode)', example: 'Margaret lives in Devon...' })
  context_block?: string;

  @ApiPropertyOptional({ description: 'Summary of previously collected stories (companion mode)', example: 'Previously shared: Meeting Arthur...' })
  stories_summary?: string;

  @ApiPropertyOptional({ description: 'Suggested topics to explore (companion mode)', example: 'Ask about: Teaching career...' })
  exploration_suggestions?: string;

  // Persona mode variables (for virtual clone)
  @ApiPropertyOptional({ description: 'Elderly person name (persona mode)', example: 'Margaret' })
  elderly_name?: string;

  @ApiPropertyOptional({ description: 'Personality description (persona mode)', example: 'Warm, loving, nostalgic...' })
  personality_block?: string;

  @ApiPropertyOptional({ description: 'Knowledge graph of memories (persona mode)', example: '# Memories...' })
  knowledge_graph?: string;

  @ApiPropertyOptional({ description: 'Key people in their life (persona mode)', example: 'John (son), Mary (daughter)...' })
  people_block?: string;

  @ApiPropertyOptional({ description: 'Speech patterns (persona mode)', example: 'Speaks warmly...' })
  speech_patterns?: string;
}

export class StartConversationResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the conversation',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  conversationId: string;

  @ApiProperty({
    description: 'ElevenLabs conversation token for WebRTC voice connection',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  conversationToken: string;

  @ApiProperty({
    description: 'Dynamic variables to pass to ElevenLabs agent for personalization',
    type: DynamicVariablesDto,
  })
  dynamicVariables: DynamicVariablesDto;
}
