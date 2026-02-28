export declare enum ConversationMode {
    COMPANION = "companion",
    PERSONA = "persona"
}
export declare class StartConversationDto {
    mode: ConversationMode;
    elderlyUserId?: string;
}
