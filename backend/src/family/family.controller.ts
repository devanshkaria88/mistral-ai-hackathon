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
}
