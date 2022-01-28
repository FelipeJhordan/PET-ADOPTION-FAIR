import {
  CacheInterceptor,
  CacheModule,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from 'infra/cache/cache-service';
import { HealthController } from 'presentation/controllers/health.controller';
import { PetModule } from './pet.module';

@Module({
  imports: [
    PetModule,
    TypeOrmModule.forRoot({}),
    CacheModule.registerAsync({
      useClass: CacheService,
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
