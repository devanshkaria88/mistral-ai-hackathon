import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';
export declare class Person extends BaseEntity {
    name: string;
    relationship: string;
    userId: string;
    stories: Story[];
}
