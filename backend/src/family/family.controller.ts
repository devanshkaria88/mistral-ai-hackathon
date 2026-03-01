import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { FamilyService } from './family.service';
import {
  CreateInviteDto,
  InviteResponseDto,
  VaultResponseDto,
  MyFamilyResponseDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('family')
@Controller('family')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get('my-family')
  @ApiOperation({ summary: 'Get my family members that I can call' })
  @ApiResponse({
    status: 200,
    description: 'List of family members',
    type: MyFamilyResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getMyFamily(@CurrentUser() user: User): Promise<MyFamilyResponseDto> {
    return this.familyService.getMyFamily(user.id);
  }

  @Post('invite')
  @ApiOperation({ summary: 'Create an invite link for family members' })
  @ApiResponse({
    status: 201,
    description: 'Invite created',
    type: InviteResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async createInvite(@Body() dto: CreateInviteDto): Promise<InviteResponseDto> {
    return this.familyService.createInvite(dto.elderlyUserId);
  }

  @Get('vault/:elderlyUserId')
  @ApiOperation({ summary: "Get the elderly user's vault (for family members)" })
  @ApiParam({ name: 'elderlyUserId', description: 'Elderly user ID' })
  @ApiResponse({
    status: 200,
    description: 'Vault contents and stats',
    type: VaultResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Not a member of this family group',
    type: ErrorResponseDto,
  })
  async getVault(
    @Param('elderlyUserId') elderlyUserId: string,
  ): Promise<VaultResponseDto> {
    return this.familyService.getVault(elderlyUserId);
  }

  @Post('join/:inviteCode')
  @ApiOperation({ summary: 'Join a family group using an invite code' })
  @ApiParam({ name: 'inviteCode', description: 'Family invite code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully joined family',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid invite code',
    type: ErrorResponseDto,
  })
  async joinFamily(
    @CurrentUser() user: User,
    @Param('inviteCode') inviteCode: string,
  ): Promise<void> {
    return this.familyService.joinFamily(user.id, inviteCode);
  }

  @Post('seed-test-family')
  @ApiOperation({ summary: 'Seed test family with two users (dev only)' })
  @ApiResponse({
    status: 200,
    description: 'Test family created',
  })
  async seedTestFamily(@CurrentUser() user: User): Promise<{ message: string }> {
    await this.familyService.seedTestFamily(user.id);
    return { message: 'Test family seeded successfully' };
  }
}
