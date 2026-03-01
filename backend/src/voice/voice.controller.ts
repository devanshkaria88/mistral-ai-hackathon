import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VoiceService } from './voice.service';
import {
  VoiceProfileResponseDto,
  UpdateCloneResponseDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('voice')
@Controller('voice')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current voice profile status' })
  @ApiResponse({
    status: 200,
    description: 'Voice profile details',
    type: VoiceProfileResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getProfile(@CurrentUser() user: User): Promise<VoiceProfileResponseDto | null> {
    return this.voiceService.getProfile(user.id);
  }

  @Post('update-clone')
  @ApiOperation({ summary: 'Trigger voice clone update with latest samples' })
  @ApiResponse({
    status: 200,
    description: 'Clone update initiated',
    type: UpdateCloneResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async updateClone(@CurrentUser() user: User): Promise<UpdateCloneResponseDto> {
    return this.voiceService.updateClone(user.id);
  }

  @Delete('samples')
  @ApiOperation({ summary: 'Delete an audio sample from voice profile' })
  @ApiResponse({
    status: 200,
    description: 'Audio sample deleted',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async deleteAudioSample(
    @CurrentUser() user: User,
    @Body() body: { sampleKey: string },
  ): Promise<{ success: boolean; message: string }> {
    return this.voiceService.deleteAudioSample(user.id, body.sampleKey);
  }
}
