import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from 'src/infra/rest/validation/validation.pipe';
import { AppModule } from './ioc/app.module';
import { applyMiddlewares } from '../infra/rest/middlewares';
import { LoggingInterceptor } from 'src/infra/rest/intercerptors/logging.interceptor';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await applyMiddlewares(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
