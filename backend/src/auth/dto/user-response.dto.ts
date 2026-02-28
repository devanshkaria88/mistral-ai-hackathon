import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../common/types/user-role.enum';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'margaret@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User display name',
    example: 'Margaret Thompson',
  })
  displayName: string;

  @ApiPropertyOptional({
    description: 'User profile photo URL',
    example: 'https://lh3.googleusercontent.com/a/photo.jpg',
  })
  photoUrl?: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    example: UserRole.ELDERLY,
  })
  role: UserRole;
}
