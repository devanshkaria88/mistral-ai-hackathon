import { ApiProperty } from '@nestjs/swagger';

export class EndConversationResponseDto {
  @ApiProperty({
    description: 'Current processing status',
    example: 'processing',
  })
  status: string;
}
