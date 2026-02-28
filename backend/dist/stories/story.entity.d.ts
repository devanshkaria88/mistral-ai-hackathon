import { BaseEntity } from '../common/entities/base.entity';
import { Conversation } from '../conversations/conversation.entity';
import { User } from '../users/user.entity';
import { Person } from './entities/person.entity';
import { Place } from './entities/place.entity';
import { Theme } from './entities/theme.entity';
export declare class Story extends BaseEntity {
    title: string;
    content: string;
    audioUrl: string;
    timePeriod: string;
    emotionalTone: string;
    embedding: string;
    metadata: Record<string, unknown>;
    deletedAt: Date;
    conversationId: string;
    userId: string;
    conversation: Conversation;
    user: User;
    people: Person[];
    places: Place[];
    themes: Theme[];
}
