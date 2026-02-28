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
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByFirebaseUid(firebaseUid: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: CreateUserData): Promise<User>;
    updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
    findAll(): Promise<User[]>;
}
