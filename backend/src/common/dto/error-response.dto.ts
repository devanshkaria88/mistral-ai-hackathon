import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorDetailDto {
  @ApiPropertyOptional({
    description: 'Field name that caused the error',
    example: 'email',
  })
  field?: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Email is required',
  })
  message: string;
}

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  status: number;

  @ApiProperty({
    description: 'Human readable error description',
    example: 'Validation failed',
  })
  message: string;

  @ApiProperty({
    description: 'Array of detailed errors',
    type: [ErrorDetailDto],
  })
  errors: ErrorDetailDto[];
}
