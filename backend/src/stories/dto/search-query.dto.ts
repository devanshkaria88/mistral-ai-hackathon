import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({
    description: 'Search query for semantic search',
    example: 'How did you meet your husband?',
  })
  @IsNotEmpty()
  @IsString()
  q: string;
}
