import { ApiProperty } from '@nestjs/swagger';
import { StoryResponseDto } from '../../stories/dto/story-response.dto';
import { VoiceQualityTier } from '../../common/types/voice-quality-tier.enum';

export class VaultStatsDto {
  @ApiProperty({
    description: 'Total number of stories',
    example: 24,
  })
  totalStories: number;

  @ApiProperty({
    description: 'Total number of conversations',
    example: 8,
  })
  totalConversations: number;

  @ApiProperty({
    description: 'Total minutes of conversation',
    example: 156,
  })
  totalMinutes: number;

  @ApiProperty({
    description: 'Number of unique people mentioned',
    example: 12,
  })
  peopleCount: number;

  @ApiProperty({
    description: 'Number of unique places mentioned',
    example: 7,
  })
  placesCount: number;
}

export class VoiceProfileSummaryDto {
  @ApiProperty({
    description: 'Current voice quality tier',
    enum: VoiceQualityTier,
    example: VoiceQualityTier.GOOD,
  })
  qualityTier: VoiceQualityTier;

  @ApiProperty({
    description: 'Number of audio samples collected',
    example: 5,
  })
  samplesCount: number;

  @ApiProperty({
    description: 'Total seconds of audio collected',
    example: 324.5,
  })
  totalAudioSeconds: number;
}

export class VaultResponseDto {
  @ApiProperty({
    description: 'Recent stories from the vault',
    type: [StoryResponseDto],
  })
  stories: StoryResponseDto[];

  @ApiProperty({
    description: 'Vault statistics',
    type: VaultStatsDto,
  })
  stats: VaultStatsDto;

  @ApiProperty({
    description: 'Voice profile status',
    type: VoiceProfileSummaryDto,
  })
  voiceProfile: VoiceProfileSummaryDto;
}
