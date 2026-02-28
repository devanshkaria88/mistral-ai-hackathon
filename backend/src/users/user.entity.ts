import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { UserRole } from '../common/types/user-role.enum';
import { FamilyGroup } from '../family/family-group.entity';
import { Conversation } from '../conversations/conversation.entity';
import { VoiceProfile } from '../voice/voice-profile.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @Column({ name: 'firebase_uid', unique: true })
  firebaseUid: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ELDERLY,
  })
  role: UserRole;

  @Column({ name: 'refresh_token_hash', nullable: true })
  refreshTokenHash: string;

  @Column({ name: 'family_group_id', type: 'uuid', nullable: true })
  familyGroupId: string;

  @ManyToOne(() => FamilyGroup, (familyGroup) => familyGroup.members, {
    nullable: true,
  })
  @JoinColumn({ name: 'family_group_id' })
  familyGroup: FamilyGroup;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];

  @OneToOne(() => VoiceProfile, (voiceProfile) => voiceProfile.user)
  voiceProfile: VoiceProfile;
}
