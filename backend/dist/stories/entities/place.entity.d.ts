import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';
export declare class Place extends BaseEntity {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    userId: string;
    stories: Story[];
}
