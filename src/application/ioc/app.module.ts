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
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { setEnvironment } from 'infra/environments';
import { HealthController } from 'presentation/controllers/health.controller';
import { PetModule } from './pet.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    PetModule,
    UserModule,
    TypeOrmModule.forRoot({}),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    {
      module: TerminusModule,
      imports: [
        UserModule,
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [HealthController],
    },
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
