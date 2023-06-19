import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error as ValidationError } from 'mongoose';

@Catch(ValidationError, MongoError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError | MongoError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    const status =
      exception instanceof ValidationError
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.CONFLICT;
    const message = exception.message || 'Validation error';

    if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        return this.handleDuplicateFieldsDB(
          exception,
          HttpStatus.CONFLICT,
          response,
        );
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: status === HttpStatus.BAD_REQUEST ? 'Bad Request' : 'Conflict',
      fields:
        exception instanceof ValidationError ? exception.message : undefined,
    });
  }

  handleDuplicateFieldsDB(err: any, statusCode: number, res: Response) {
    const dupField = Object.keys(err.keyValue)[0];
    const message = `Duplicate field(${dupField}). Please use another value(${err.keyValue[dupField]})!`;
    return res.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
