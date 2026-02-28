import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class StoryFilterQueryDto extends PaginationQueryDto {
    personId?: string;
    placeId?: string;
    themeSlug?: string;
    timePeriod?: string;
}
