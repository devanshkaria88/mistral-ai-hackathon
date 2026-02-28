import { VoiceQualityTier } from '../../common/types/voice-quality-tier.enum';
export declare class VoiceProfileResponseDto {
    id: string;
    userId: string;
    elevenLabsVoiceId?: string;
    samplesCount: number;
    totalAudioSeconds: number;
    qualityTier: VoiceQualityTier;
    lastUpdatedAt?: Date;
}
