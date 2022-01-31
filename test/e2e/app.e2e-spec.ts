import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/application/ioc/app.module';
import { PetModule } from 'application/ioc/pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setEnvironment } from 'infra/environments';
import { ConfigModule } from '@nestjs/config';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { mockAddPetRequestDTO } from '../units/mocks/pet.mock';

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

  it('/pets (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/pets')
      .send(mockAddPetRequestDTO)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.CREATED);

    console.log(body);
    expect(body.state).toBeTruthy();
    expect(body.breed).toBe(mockAddPetRequestDTO.breed);
  });
  it('/pets (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/pets')
      .expect(HttpStatus.OK);

    expect(body).toHaveLength(1);
    expect(body[0].createdAt).toBeTruthy();
    expect(body[0].updatedAt).toBeTruthy();

    expect(body).toEqual([
      {
        ...mockAddPetRequestDTO,
        createdAt: body[0].createdAt,
        updatedAt: body[0].updatedAt,
        deletedAt: body[0].deletedAt,
      },
    ]);
  });

  afterAll(async () => {
    await petRepository.query('DELETE FROM pets;');
    await app.close();
  });
});
