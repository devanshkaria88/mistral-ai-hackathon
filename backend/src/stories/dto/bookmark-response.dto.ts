import { ApiProperty } from '@nestjs/swagger';

export class BookmarkResponseDto {
  @ApiProperty({
    description: 'Whether the story is now bookmarked',
    example: true,
  })
  bookmarked: boolean;
}
