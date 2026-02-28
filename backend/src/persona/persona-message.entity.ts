import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';

@Entity('persona_messages')
export class PersonaMessage extends BaseEntity {
  @Column({ name: 'family_user_id', type: 'uuid' })
  familyUserId: string;

  @Column({ name: 'elderly_user_id', type: 'uuid' })
  elderlyUserId: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  response: string;

  @Column({ name: 'response_audio_url', nullable: true })
  responseAudioUrl: string;

  @Column({ name: 'source_story_ids', type: 'jsonb', default: [] })
  sourceStoryIds: string[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'family_user_id' })
  familyUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'elderly_user_id' })
  elderlyUser: User;
}
