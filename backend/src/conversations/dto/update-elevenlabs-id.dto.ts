import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateElevenLabsIdDto {
  @ApiProperty({
    description: 'The ElevenLabs conversation ID returned when the session connects',
    example: 'conv_1001kjmd70v5ebxvdyk9s33tk6fm',
  })
  @IsString()
  @IsNotEmpty()
  elevenLabsConversationId: string;
}
