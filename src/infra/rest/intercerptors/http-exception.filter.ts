import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getDate, getTime } from 'shared/utils/getDateAndTime';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter<HttpException>
{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const statusCode: HttpStatus = exception.getStatus();
    const date = new Date();
    response.status(statusCode).json({
      statusCode,
      message: exception.message,
      date: getDate(date),
      time: getTime(date),
      path: request.url,
    });
  }
}
