import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  DeleteDateColumn,
} from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Conversation } from '../conversations/conversation.entity';
import { User } from '../users/user.entity';
import { Person } from './entities/person.entity';
import { Place } from './entities/place.entity';
import { Theme } from './entities/theme.entity';

@Entity('stories')
export class Story extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'audio_url', nullable: true })
  audioUrl: string;

  @Column({ name: 'time_period', nullable: true })
  timePeriod: string;

  @Column({ name: 'emotional_tone', nullable: true })
  emotionalTone: string;

  @Column({ type: 'vector', length: 1024, nullable: true })
  embedding: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'conversation_id', type: 'uuid', nullable: true })
  conversationId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.stories, {
    nullable: true,
  })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Person, (person) => person.stories)
  @JoinTable({
    name: 'story_people',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'person_id', referencedColumnName: 'id' },
  })
  people: Person[];

  @ManyToMany(() => Place, (place) => place.stories)
  @JoinTable({
    name: 'story_places',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'place_id', referencedColumnName: 'id' },
  })
  places: Place[];

  @ManyToMany(() => Theme, (theme) => theme.stories)
  @JoinTable({
    name: 'story_themes',
    joinColumn: { name: 'story_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'theme_id', referencedColumnName: 'id' },
  })
  themes: Theme[];
}
