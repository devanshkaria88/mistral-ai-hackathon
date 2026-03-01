import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { ConversationStatus } from '../common/types/conversation-status.enum';
import { User } from '../users/user.entity';
import { Story } from '../stories/story.entity';

export enum ConversationMode {
  COMPANION = 'companion',
  PERSONA = 'persona',
}

@Entity('conversations')
export class Conversation extends BaseEntity {
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: ConversationMode.COMPANION,
  })
  mode: ConversationMode;

  @Column({ name: 'persona_user_id', type: 'uuid', nullable: true })
  personaUserId: string | null;

  @Column({ name: 'elevenlabs_session_id', nullable: true })
  elevenLabsSessionId: string;

  @Column({
    type: 'enum',
    enum: ConversationStatus,
    default: ConversationStatus.ACTIVE,
  })
  status: ConversationStatus;

  @Column({ type: 'text', nullable: true })
  transcript: string;

  @Column({ name: 'audio_url', nullable: true })
  audioUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Story, (story) => story.conversation)
  stories: Story[];
}
