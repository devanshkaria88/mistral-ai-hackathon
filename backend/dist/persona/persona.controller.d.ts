import { PersonaService } from './persona.service';
import { AskPersonaDto, PersonaResponseDto, PersonaMessageResponseDto, PersonaHistoryQueryDto } from './dto';
import { User } from '../users/user.entity';
export declare class PersonaController {
    private readonly personaService;
    constructor(personaService: PersonaService);
    askPersona(user: User, dto: AskPersonaDto): Promise<PersonaResponseDto>;
    getHistory(user: User, query: PersonaHistoryQueryDto): Promise<PersonaMessageResponseDto[]>;
}
