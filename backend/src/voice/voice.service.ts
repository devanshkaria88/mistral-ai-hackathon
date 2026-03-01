import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoiceQualityTier } from '../common/types/voice-quality-tier.enum';
import {
  VoiceProfileResponseDto,
  UpdateCloneResponseDto,
  AudioSampleDto,
} from './dto';
import { VoiceProfile } from './voice-profile.entity';
import { S3Service } from '../integrations/s3/s3.service';

@Injectable()
export class VoiceService {
  private readonly logger = new Logger(VoiceService.name);

  constructor(
    @InjectRepository(VoiceProfile)
    private readonly voiceProfileRepository: Repository<VoiceProfile>,
    private readonly s3Service: S3Service,
  ) {}

  async getProfile(userId: string): Promise<VoiceProfileResponseDto | null> {
    this.logger.log(`Fetching voice profile for user: ${userId}`);
    
    const profile = await this.voiceProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      return null;
    }

    // Generate presigned URLs for audio samples
    const audioSamples: AudioSampleDto[] = [];
    if (profile.audioSegmentKeys && profile.audioSegmentKeys.length > 0) {
      for (const segment of profile.audioSegmentKeys) {
        try {
          const presigned = await this.s3Service.getPresignedDownloadUrl(segment.key, 3600);
          audioSamples.push({
            key: segment.key,
            durationSeconds: segment.durationSeconds,
            timestamp: segment.timestamp,
            playbackUrl: presigned.url,
          });
        } catch (e) {
          this.logger.warn(`Could not generate presigned URL for ${segment.key}: ${e.message}`);
          audioSamples.push({
            key: segment.key,
            durationSeconds: segment.durationSeconds,
            timestamp: segment.timestamp,
          });
        }
      }
    }

    return {
      id: profile.id,
      userId: profile.userId,
      elevenLabsVoiceId: profile.elevenLabsVoiceId,
      samplesCount: profile.samplesCount,
      totalAudioSeconds: profile.totalAudioSeconds,
      qualityTier: profile.qualityTier,
      lastUpdatedAt: profile.lastUpdatedAt,
      audioSamples,
    };
  }

  async findByUserId(userId: string): Promise<VoiceProfile | null> {
    return this.voiceProfileRepository.findOne({
      where: { userId },
    });
  }

  async updateClone(userId: string): Promise<UpdateCloneResponseDto> {
    this.logger.log(`Updating voice clone for user: ${userId}`);
    
    const profile = await this.voiceProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      return {
        status: 'no_profile',
        samplesCount: 0,
      };
    }

    return {
      status: 'updating',
      samplesCount: profile.samplesCount,
    };
  }

  async createOrUpdate(
    userId: string,
    data: Partial<VoiceProfile>,
  ): Promise<VoiceProfile> {
    let profile = await this.voiceProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      profile = this.voiceProfileRepository.create({
        userId,
        ...data,
      });
    } else {
      Object.assign(profile, data);
    }

    profile.lastUpdatedAt = new Date();
    return this.voiceProfileRepository.save(profile);
  }

  async deleteAudioSample(userId: string, sampleKey: string): Promise<{ success: boolean; message: string }> {
    this.logger.log(`Deleting audio sample ${sampleKey} for user ${userId}`);

    const profile = await this.voiceProfileRepository.findOne({
      where: { userId },
    });

    if (!profile) {
      return { success: false, message: 'Voice profile not found' };
    }

    if (!profile.audioSegmentKeys || profile.audioSegmentKeys.length === 0) {
      return { success: false, message: 'No audio samples found' };
    }

    const sampleIndex = profile.audioSegmentKeys.findIndex(s => s.key === sampleKey);
    if (sampleIndex === -1) {
      return { success: false, message: 'Audio sample not found' };
    }

    // Remove the sample and update totals
    const removedSample = profile.audioSegmentKeys[sampleIndex];
    profile.audioSegmentKeys.splice(sampleIndex, 1);
    profile.samplesCount = profile.audioSegmentKeys.length;
    profile.totalAudioSeconds -= removedSample.durationSeconds;
    if (profile.totalAudioSeconds < 0) profile.totalAudioSeconds = 0;

    // Update quality tier
    if (profile.samplesCount >= 10) {
      profile.qualityTier = VoiceQualityTier.EXCELLENT;
    } else if (profile.samplesCount >= 5) {
      profile.qualityTier = VoiceQualityTier.GOOD;
    } else if (profile.samplesCount >= 3) {
      profile.qualityTier = VoiceQualityTier.BASIC;
    } else {
      profile.qualityTier = VoiceQualityTier.NONE;
    }

    profile.lastUpdatedAt = new Date();
    await this.voiceProfileRepository.save(profile);

    // Delete from S3
    try {
      await this.s3Service.deleteObject(sampleKey);
      this.logger.log(`Deleted audio sample from S3: ${sampleKey}`);
    } catch (e) {
      this.logger.warn(`Could not delete from S3: ${e.message}`);
    }

    return { success: true, message: 'Audio sample deleted' };
  }
}
