import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  GoogleAuthDto,
  RefreshTokenDto,
  AuthResponseDto,
  TokenResponseDto,
  UserResponseDto,
} from './dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate with Google via Firebase ID token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid Firebase ID token',
    type: ErrorResponseDto,
  })
  async googleAuth(@Body() dto: GoogleAuthDto): Promise<AuthResponseDto> {
    return this.authService.authenticateWithGoogle(dto.idToken);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed tokens',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
    type: ErrorResponseDto,
  })
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current user profile',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getMe(@CurrentUser() user: User): Promise<UserResponseDto> {
    return this.authService.mapUserToResponse(user);
  }
}
