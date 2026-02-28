import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../integrations/firebase/firebase.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthResponseDto, TokenResponseDto, UserResponseDto } from './dto';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authenticateWithGoogle(idToken: string): Promise<AuthResponseDto> {
    // Verify Firebase ID token
    const firebaseClaims = await this.firebaseService.verifyIdToken(idToken);

    // Find or create user
    let user = await this.usersService.findByFirebaseUid(firebaseClaims.uid);

    if (!user) {
      user = await this.usersService.create({
        email: firebaseClaims.email,
        displayName: firebaseClaims.name || firebaseClaims.email.split('@')[0],
        photoUrl: firebaseClaims.picture,
        firebaseUid: firebaseClaims.uid,
      });
      this.logger.log(`Created new user: ${user.email}`);
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: this.mapUserToDto(user),
    };
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponseDto> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify<JwtPayload & { type: string }>(
        refreshToken,
        {
          secret: this.configService.get<string>('jwt.secret'),
        },
      );

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Find user
      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.refreshTokenHash) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Verify refresh token hash
      const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens (rotate refresh token)
      return this.generateTokens(user);
    } catch (error) {
      this.logger.error('Failed to refresh tokens', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.usersService.findById(userId);
  }

  private async generateTokens(user: User): Promise<TokenResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate access token (15 min)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: 900, // 15 minutes in seconds
    });

    // Generate refresh token (7 days)
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh', jti: uuidv4() },
      {
        expiresIn: 604800, // 7 days in seconds
      },
    );

    // Hash and store refresh token
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }

  private mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      role: user.role,
    };
  }

  mapUserToResponse(user: User): UserResponseDto {
    return this.mapUserToDto(user);
  }
}
