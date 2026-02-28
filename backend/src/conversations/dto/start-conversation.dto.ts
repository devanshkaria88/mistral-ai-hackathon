import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export enum ConversationMode {
  COMPANION = 'companion',
  PERSONA = 'persona',
}

export class StartConversationDto {
  @ApiProperty({
    enum: ConversationMode,
    description: 'Type of conversation: companion (for elderly users) or persona (for family members)',
    example: ConversationMode.COMPANION,
  })
  @IsEnum(ConversationMode)
  mode: ConversationMode;

  @ApiPropertyOptional({
    description: 'Required when mode is PERSONA - the elderly user whose persona to talk to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  elderlyUserId?: string;
}
