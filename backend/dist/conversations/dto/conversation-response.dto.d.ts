import { ConversationStatus } from '../../common/types/conversation-status.enum';
export declare class ConversationResponseDto {
    id: string;
    userId: string;
    status: ConversationStatus;
    transcript?: string;
    audioUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    storiesCount: number;
}
