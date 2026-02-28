import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Story } from '../story.entity';

@Entity('themes')
export class Theme extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(() => Story, (story) => story.themes)
  stories: Story[];
}
