import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the person',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the person',
    example: 'Arthur',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Relationship to the elderly person',
    example: 'husband',
  })
  relationship?: string;
}
