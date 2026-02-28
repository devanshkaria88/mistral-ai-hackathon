import { FamilyService } from './family.service';
import { CreateInviteDto, InviteResponseDto, VaultResponseDto } from './dto';
export declare class FamilyController {
    private readonly familyService;
    constructor(familyService: FamilyService);
    createInvite(dto: CreateInviteDto): Promise<InviteResponseDto>;
    getVault(elderlyUserId: string): Promise<VaultResponseDto>;
}
