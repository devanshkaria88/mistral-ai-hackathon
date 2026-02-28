import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class StoryFilterQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by person ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  personId?: string;

  @ApiPropertyOptional({
    description: 'Filter by place ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  placeId?: string;

  @ApiPropertyOptional({
    description: 'Filter by theme slug',
    example: 'love',
  })
  @IsOptional()
  @IsString()
  themeSlug?: string;

  @ApiPropertyOptional({
    description: 'Filter by time period',
    example: '1960s',
  })
  @IsOptional()
  @IsString()
  timePeriod?: string;
}
