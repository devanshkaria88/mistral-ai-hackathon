import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PersonaService } from './persona.service';
import {
  AskPersonaDto,
  PersonaResponseDto,
  PersonaMessageResponseDto,
  PersonaHistoryQueryDto,
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('persona')
@Controller('persona')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post('ask')
  @ApiOperation({ summary: 'Ask a question to the elderly persona' })
  @ApiResponse({
    status: 200,
    description: 'Persona response with source stories',
    type: PersonaResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async askPersona(
    @CurrentUser() user: User,
    @Body() dto: AskPersonaDto,
  ): Promise<PersonaResponseDto> {
    return this.personaService.askPersona(user.id, dto.elderlyUserId, dto.question);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get conversation history with persona' })
  @ApiResponse({
    status: 200,
    description: 'List of previous persona interactions',
    type: [PersonaMessageResponseDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  async getHistory(
    @CurrentUser() user: User,
    @Query() query: PersonaHistoryQueryDto,
  ): Promise<PersonaMessageResponseDto[]> {
    return this.personaService.getHistory(user.id, query.elderlyUserId);
  }
}
