import { ApiProperty } from '@nestjs/swagger';

export class ThemeResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the theme',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Display name of the theme',
    example: 'Love',
  })
  name: string;

  @ApiProperty({
    description: 'URL-friendly slug',
    example: 'love',
  })
  slug: string;
}
