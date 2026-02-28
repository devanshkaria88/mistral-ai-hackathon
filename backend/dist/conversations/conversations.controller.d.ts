import { ConversationsService } from './conversations.service';
import { StartConversationDto, StartConversationResponseDto, EndConversationResponseDto, ConversationResponseDto } from './dto';
import { User } from '../users/user.entity';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    startConversation(user: User, dto: StartConversationDto): Promise<StartConversationResponseDto>;
    endConversation(id: string): Promise<EndConversationResponseDto>;
    findAll(user: User): Promise<ConversationResponseDto[]>;
    findOne(id: string): Promise<ConversationResponseDto>;
}
