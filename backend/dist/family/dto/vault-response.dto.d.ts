import { StoryResponseDto } from '../../stories/dto/story-response.dto';
import { VoiceQualityTier } from '../../common/types/voice-quality-tier.enum';
export declare class VaultStatsDto {
    totalStories: number;
    totalConversations: number;
    totalMinutes: number;
    peopleCount: number;
    placesCount: number;
}
export declare class VoiceProfileSummaryDto {
    qualityTier: VoiceQualityTier;
    samplesCount: number;
    totalAudioSeconds: number;
}
export declare class VaultResponseDto {
    stories: StoryResponseDto[];
    stats: VaultStatsDto;
    voiceProfile: VoiceProfileSummaryDto;
}
