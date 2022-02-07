import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from 'infra/rest/validation/validation.pipe';
import { AppModule } from './ioc/app.module';
import { applyMiddlewares } from '../infra/rest/middlewares';
import { LoggingInterceptor } from 'infra/rest/intercerptors/logging.interceptor';
import { HttpExceptionFilter } from 'infra/rest/intercerptors/http-exception.filter';
import { SwaggerModule } from '@nestjs/swagger';
import { config } from 'infra/rest/swagger/swagger-config';

declare const module: any;

export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await applyMiddlewares(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
