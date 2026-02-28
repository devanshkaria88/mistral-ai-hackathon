import { UserRole } from '../../common/types/user-role.enum';
export declare class UserResponseDto {
    id: string;
    email: string;
    displayName: string;
    photoUrl?: string;
    role: UserRole;
}
