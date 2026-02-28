import { ApiProperty } from '@nestjs/swagger';

export class UpdateCloneResponseDto {
  @ApiProperty({
    description: 'Current status of the voice clone update',
    example: 'updating',
  })
  status: string;

  @ApiProperty({
    description: 'Number of samples being used',
    example: 5,
  })
  samplesCount: number;
}
