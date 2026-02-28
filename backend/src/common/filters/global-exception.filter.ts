import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponse {
  status: number;
  message: string;
  errors: Array<{ field?: string; message: string }>;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: Array<{ field?: string; message: string }> = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;

        // Handle class-validator errors
        if (Array.isArray(responseObj.message)) {
          errors = (responseObj.message as string[]).map((msg) => {
            // Try to extract field name from validation message
            const fieldMatch = msg.match(/^(\w+)\s/);
            return {
              field: fieldMatch ? fieldMatch[1] : undefined,
              message: msg,
            };
          });
          message = 'Validation failed';
        }
      }
    } else {
      // Log unexpected errors
      this.logger.error('Unexpected error:', exception);
      if (exception instanceof Error) {
        this.logger.error(exception.stack);
      }
    }

    const errorResponse: ErrorResponse = {
      status,
      message,
      errors,
    };

    response.status(status).json(errorResponse);
  }
}
