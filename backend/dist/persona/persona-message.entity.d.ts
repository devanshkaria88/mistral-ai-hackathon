import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
export declare class PersonaMessage extends BaseEntity {
    familyUserId: string;
    elderlyUserId: string;
    question: string;
    response: string;
    responseAudioUrl: string;
    sourceStoryIds: string[];
    familyUser: User;
    elderlyUser: User;
}
