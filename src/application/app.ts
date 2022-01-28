import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from 'src/infra/rest/validation/validation.pipe';
import { AppModule } from './ioc/app.module';
import { applyMiddlewares } from '../infra/rest/middlewares';
import { LoggingInterceptor } from 'src/infra/rest/intercerptors/logging.interceptor';
import { HttpExceptionFilter } from 'src/infra/rest/intercerptors/http-exception.filter';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await applyMiddlewares(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
