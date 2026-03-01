import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FamilyMemberResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'Display name' })
  displayName: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  photoUrl?: string;

  @ApiProperty({ description: 'Relationship to the current user', example: 'Grandmother' })
  relationship: string;

  @ApiProperty({ description: 'Whether the user has a voice clone available' })
  hasVoiceClone: boolean;

  @ApiProperty({ description: 'Number of stories recorded' })
  storiesCount: number;
}

export class MyFamilyResponseDto {
  @ApiProperty({ description: 'Family group name' })
  familyName: string;

  @ApiProperty({ description: 'List of family members', type: [FamilyMemberResponseDto] })
  members: FamilyMemberResponseDto[];
}
