import { PersonaResponseDto, PersonaMessageResponseDto } from './dto';
export declare class PersonaService {
    private readonly logger;
    askPersona(familyUserId: string, elderlyUserId: string, question: string): Promise<PersonaResponseDto>;
    getHistory(familyUserId: string, elderlyUserId: string): Promise<PersonaMessageResponseDto[]>;
}
