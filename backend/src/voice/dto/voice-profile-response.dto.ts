import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VoiceQualityTier } from '../../common/types/voice-quality-tier.enum';

export class VoiceProfileResponseDto {
  @ApiProperty({
    description: 'Voice profile ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User ID this profile belongs to',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'ElevenLabs voice clone ID',
    example: 'voice_abc123',
  })
  elevenLabsVoiceId?: string;

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

  @ApiProperty({
    description: 'Current voice quality tier',
    enum: VoiceQualityTier,
    example: VoiceQualityTier.GOOD,
  })
  qualityTier: VoiceQualityTier;

  @ApiPropertyOptional({
    description: 'When the voice profile was last updated',
    example: '2026-02-28T14:30:00Z',
  })
  lastUpdatedAt?: Date;
}
