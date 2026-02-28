import { VoiceProfileResponseDto, UpdateCloneResponseDto } from './dto';
export declare class VoiceService {
    private readonly logger;
    getProfile(userId: string): Promise<VoiceProfileResponseDto>;
    updateClone(userId: string): Promise<UpdateCloneResponseDto>;
}
