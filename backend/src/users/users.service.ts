import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../common/types/user-role.enum';

export interface CreateUserData {
  email: string;
  displayName: string;
  photoUrl?: string;
  firebaseUid: string;
  role?: UserRole;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { firebaseUid } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(data: CreateUserData): Promise<User> {
    const user = this.userRepository.create({
      ...data,
      role: data.role || UserRole.ELDERLY,
    });
    return this.userRepository.save(user);
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshTokenHash: string | null,
  ): Promise<void> {
    await this.userRepository.update(userId, { 
      refreshTokenHash: refreshTokenHash ?? undefined 
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
