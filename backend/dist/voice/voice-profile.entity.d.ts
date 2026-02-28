import { BaseEntity } from '../common/entities/base.entity';
import { VoiceQualityTier } from '../common/types/voice-quality-tier.enum';
import { User } from '../users/user.entity';
export declare class VoiceProfile extends BaseEntity {
    userId: string;
    elevenLabsVoiceId: string;
    samplesCount: number;
    totalAudioSeconds: number;
    qualityTier: VoiceQualityTier;
    lastUpdatedAt: Date;
    user: User;
}
