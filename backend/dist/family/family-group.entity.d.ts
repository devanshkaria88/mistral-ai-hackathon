import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
export declare class FamilyGroup extends BaseEntity {
    name: string;
    inviteCode: string;
    elderlyUserId: string;
    members: User[];
}
