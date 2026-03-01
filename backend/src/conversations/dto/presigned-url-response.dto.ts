import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlResponseDto {
  @ApiProperty({
    description: 'Presigned URL for accessing the resource',
    example: 'https://s3.amazonaws.com/bucket/key?X-Amz-Signature=...',
  })
  url: string;

  @ApiProperty({
    description: 'Expiration time of the presigned URL',
    example: '2024-01-15T12:00:00.000Z',
  })
  expiresAt: Date;
}
