import { StoryResponseDto } from './story-response.dto';
export declare class TimelinePeriodDto {
    period: string;
    stories: StoryResponseDto[];
}
export declare class TimelineResponseDto {
    timeline: TimelinePeriodDto[];
}
