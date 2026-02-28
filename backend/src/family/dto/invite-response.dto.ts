import { ApiProperty } from '@nestjs/swagger';

export class InviteResponseDto {
  @ApiProperty({
    description: 'Invite code for joining the family group',
    example: 'MV-ABC123',
  })
  inviteCode: string;

  @ApiProperty({
    description: 'Full invite link',
    example: 'https://memoryvault.app/join/MV-ABC123',
  })
  inviteLink: string;
}
