import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlaceResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the place',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the place',
    example: 'Palais Dance Hall',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the place',
    example: 'Local dance venue in London',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 51.5074,
  })
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: -0.1278,
  })
  longitude?: number;
}
