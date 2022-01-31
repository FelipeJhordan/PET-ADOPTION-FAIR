import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/ioc/app.module';
import { PetModule } from 'application/ioc/pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setEnvironment } from 'infra/environments';
import { ConfigModule } from '@nestjs/config';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';

describe(' (e2e)', () => {
  let app: INestApplication;
  let petRepository: PetRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PetModule,
        TypeOrmModule.forRoot({
          synchronize: true,
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
          envFilePath: setEnvironment(),
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    petRepository = module.get<PetRepository>(PetRepository);
  });

  it('/pets (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/pets')
      .expect(200);
  });
});
