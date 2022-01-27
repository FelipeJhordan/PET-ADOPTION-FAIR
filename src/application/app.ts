import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from 'src/infra/rest/validation.pipe';
import { AppModule } from './ioc/app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
