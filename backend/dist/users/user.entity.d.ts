import { BaseEntity } from '../common/entities/base.entity';
import { UserRole } from '../common/types/user-role.enum';
import { FamilyGroup } from '../family/family-group.entity';
import { Conversation } from '../conversations/conversation.entity';
import { VoiceProfile } from '../voice/voice-profile.entity';
export declare class User extends BaseEntity {
    email: string;
    displayName: string;
    photoUrl: string;
    firebaseUid: string;
    role: UserRole;
    refreshTokenHash: string;
    familyGroupId: string;
    familyGroup: FamilyGroup;
    conversations: Conversation[];
    voiceProfile: VoiceProfile;
}
