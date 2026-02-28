import { InviteResponseDto, VaultResponseDto } from './dto';
export declare class FamilyService {
    private readonly logger;
    createInvite(elderlyUserId: string): Promise<InviteResponseDto>;
    getVault(elderlyUserId: string): Promise<VaultResponseDto>;
}
