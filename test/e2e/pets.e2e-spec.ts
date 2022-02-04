import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PetModule } from 'application/ioc/pet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setEnvironment } from 'infra/environments';
import { ConfigModule } from '@nestjs/config';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { mockAddPetRequestDTO } from '../units/mocks/pet/pet.mock';
import { Repository } from 'typeorm';
import { Pet } from 'domain/models/pet';
import { mockUserClerk } from '../units/mocks/user/user.mock';
import { Jwt } from 'application/protocols/jwt.protocol';
import { JwtAdapter } from 'infra/jwt/jwt-adapter';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { UserModule } from 'application/ioc/user.module';

const findFirstPetAndReturnId = async (
  repository: Repository<Pet>,
): Promise<string> => {
  const pet = await repository.find();
  return pet[0]?.id;
};

describe('  (e2e)', () => {
  let app: INestApplication;
  let petRepository: PetRepository;
  let userRepository: UserRepository;
  let encrypt: Jwt;
  let token: string;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PetModule,
        TypeOrmModule.forRoot({
          synchronize: true,
        }),
        TypeOrmModule.forFeature([UserRepository]),
        ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
          envFilePath: setEnvironment(),
        }),
      ],
      providers: [
        {
          provide: Jwt,
          useClass: JwtAdapter,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    petRepository = module.get<PetRepository>(PetRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    encrypt = module.get<Jwt>(Jwt);

    const userSaved = await userRepository.save(mockUserClerk);
    token = await encrypt.sign({ id: userSaved.id });
  });

  it('/pets (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/pets')
      .send(mockAddPetRequestDTO)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/);

    expect(body.state).toBeTruthy();
    expect(body.breed).toBe(mockAddPetRequestDTO.breed);
  });
  it('/pets (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
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
  it('/pets/:id (GET)', async () => {
    const uuidPet = await findFirstPetAndReturnId(petRepository);
    const { body } = await request(app.getHttpServer())
      .get('/pets/' + uuidPet)
      .set('Authorization', `Bearer ${token}`)

      .expect(HttpStatus.OK);

    expect(body).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
    expect(body.updatedAt).toBeTruthy();

    expect(body).toEqual({
      ...mockAddPetRequestDTO,
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
      deletedAt: body.deletedAt,
    });
  });

  it('/pets/:id (DELETE)', async () => {
    const uuidPet = await findFirstPetAndReturnId(petRepository);
    const { body } = await request(app.getHttpServer())
      .delete('/pets/' + uuidPet)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    const newIdSearch = await findFirstPetAndReturnId(petRepository);

    expect(newIdSearch).toBeUndefined();
  });

  afterAll(async () => {
    await petRepository.query('DELETE FROM pets;');
    await app.close();
  });
});
