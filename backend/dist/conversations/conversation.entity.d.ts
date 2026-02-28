import { BaseEntity } from '../common/entities/base.entity';
import { ConversationStatus } from '../common/types/conversation-status.enum';
import { User } from '../users/user.entity';
import { Story } from '../stories/story.entity';
export declare class Conversation extends BaseEntity {
    userId: string;
    elevenLabsSessionId: string;
    status: ConversationStatus;
    transcript: string;
    audioUrl: string;
    metadata: Record<string, unknown>;
    deletedAt: Date;
    user: User;
    stories: Story[];
}
