import { StartConversationDto, StartConversationResponseDto, EndConversationResponseDto, ConversationResponseDto } from './dto';
import { ElevenLabsService } from '../integrations/elevenlabs/elevenlabs.service';
export declare class ConversationsService {
    private readonly elevenLabsService;
    private readonly logger;
    constructor(elevenLabsService: ElevenLabsService);
    startConversation(userId: string, dto: StartConversationDto): Promise<StartConversationResponseDto>;
    endConversation(conversationId: string): Promise<EndConversationResponseDto>;
    findAll(userId: string): Promise<ConversationResponseDto[]>;
    findOne(conversationId: string): Promise<ConversationResponseDto>;
}
