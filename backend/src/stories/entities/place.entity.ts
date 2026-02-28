import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';

@Entity('places')
export class Place extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToMany(() => Story, (story) => story.places)
  stories: Story[];
}
