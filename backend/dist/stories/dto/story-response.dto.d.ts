import { PersonResponseDto } from './person-response.dto';
import { PlaceResponseDto } from './place-response.dto';
import { ThemeResponseDto } from './theme-response.dto';
export declare class StoryResponseDto {
    id: string;
    title: string;
    content: string;
    audioUrl?: string;
    timePeriod?: string;
    emotionalTone?: string;
    userId: string;
    conversationId?: string;
    createdAt: Date;
    people: PersonResponseDto[];
    places: PlaceResponseDto[];
    themes: ThemeResponseDto[];
}
