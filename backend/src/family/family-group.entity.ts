import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';

@Entity('family_groups')
export class FamilyGroup extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'invite_code', unique: true })
  inviteCode: string;

  @Column({ name: 'elderly_user_id', type: 'uuid', nullable: true })
  elderlyUserId: string;

  @OneToMany(() => User, (user) => user.familyGroup)
  members: User[];
}
