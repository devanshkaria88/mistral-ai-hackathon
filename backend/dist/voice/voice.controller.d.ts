import { VoiceService } from './voice.service';
import { VoiceProfileResponseDto, UpdateCloneResponseDto } from './dto';
import { User } from '../users/user.entity';
export declare class VoiceController {
    private readonly voiceService;
    constructor(voiceService: VoiceService);
    getProfile(user: User): Promise<VoiceProfileResponseDto>;
    updateClone(user: User): Promise<UpdateCloneResponseDto>;
}
