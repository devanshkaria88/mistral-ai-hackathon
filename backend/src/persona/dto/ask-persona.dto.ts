import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AskPersonaDto {
  @ApiProperty({
    description: 'User ID of the elderly person whose persona to query',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  elderlyUserId: string;

  @ApiProperty({
    description: 'Question to ask the persona',
    example: 'What was your wedding day like?',
  })
  @IsNotEmpty()
  @IsString()
  question: string;
}
