import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../integrations/firebase/firebase.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthResponseDto, TokenResponseDto, UserResponseDto } from './dto';
export declare class AuthService {
    private readonly firebaseService;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(firebaseService: FirebaseService, usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    authenticateWithGoogle(idToken: string): Promise<AuthResponseDto>;
    refreshTokens(refreshToken: string): Promise<TokenResponseDto>;
    validateUserById(userId: string): Promise<User | null>;
    private generateTokens;
    private mapUserToDto;
    mapUserToResponse(user: User): UserResponseDto;
}
