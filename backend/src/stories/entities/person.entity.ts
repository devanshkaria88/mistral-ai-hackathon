import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';

@Entity('people')
export class Person extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  relationship: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToMany(() => Story, (story) => story.people)
  stories: Story[];
}
