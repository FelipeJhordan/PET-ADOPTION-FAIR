import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'application/ioc/user.module';
import { UserService } from 'application/services/user.service';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { setEnvironment } from 'infra/environments';
import request from 'supertest';
import { mockUserRegisterRequestDto } from '../units/mocks/user.mock';

describe(' (e2e) ', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UserModule,
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
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('/users/register (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users/register')
      .send(mockUserRegisterRequestDto)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.CREATED);

    expect(body.id).toBeTruthy();
  });

  afterAll(async () => {
    await userRepository.query(
      'DELETE FROM users;DELETE FROM persons;',
    );
    await app.close();
  });
});
