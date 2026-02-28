import { ApiProperty } from '@nestjs/swagger';
import { StoryResponseDto } from './story-response.dto';

export class TimelinePeriodDto {
  @ApiProperty({
    description: 'Time period label',
    example: '1960s',
  })
  period: string;

  @ApiProperty({
    description: 'Stories from this time period',
    type: [StoryResponseDto],
  })
  stories: StoryResponseDto[];
}

export class TimelineResponseDto {
  @ApiProperty({
    description: 'Stories grouped by time period',
    type: [TimelinePeriodDto],
  })
  timeline: TimelinePeriodDto[];
}
