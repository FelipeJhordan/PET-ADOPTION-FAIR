import {
  CacheInterceptor,
  CacheModule,
  Module,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from 'src/infra/cache/cache-service';
import { PetModule } from './pet.module';

@Module({
  imports: [
    PetModule,
    TypeOrmModule.forRoot({}),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
