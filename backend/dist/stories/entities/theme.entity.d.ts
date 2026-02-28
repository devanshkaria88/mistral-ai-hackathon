import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';
export declare class Theme extends BaseEntity {
    name: string;
    slug: string;
    stories: Story[];
}
