import {
  CacheInterceptor,
  CacheModule,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from 'infra/cache/cache-service';
import { setEnvironment } from 'infra/environments';
import { HealthController } from 'presentation/controllers/health.controller';
import { PetModule } from './pet.module';

@Module({
  imports: [
    PetModule,
    TypeOrmModule.forRoot({}),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
