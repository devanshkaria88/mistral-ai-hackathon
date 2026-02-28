import { AuthService } from './auth.service';
import { GoogleAuthDto, RefreshTokenDto, AuthResponseDto, TokenResponseDto, UserResponseDto } from './dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(dto: GoogleAuthDto): Promise<AuthResponseDto>;
    refreshToken(dto: RefreshTokenDto): Promise<TokenResponseDto>;
    getMe(user: User): Promise<UserResponseDto>;
}
