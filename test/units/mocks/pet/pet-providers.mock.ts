import { Hash } from 'application/protocols/hash.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import { PetService } from 'application/services/pet.service';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { PetController } from 'presentation/controllers/pet.controller';
import { mockUser } from '../user/user.mock';

// Precisa adicionar os providers necessários do authGuard para validar as rotas
export const mockPetServiceParams = (): Array<any> => {
  const mock = [
    PetController,
    {
      provide: PetService,
      useFactory: () => ({
        listPets: jest.fn(() => true),
      }),
    },
    {
      provide: UserRepository,
      useFactory: () => ({
        save: jest.fn((obj) => mockUser),
        create: jest.fn(() => true),
        findOne: jest.fn(() => mockUser),
        find: jest.fn(() => mockUser),
        update: jest.fn(() => true),
        softDelete: jest.fn(() => true),
        findByEmail: jest.fn(() => false),
        findByUsername: jest.fn(() => false),
      }),
    },
    {
      provide: Hash,
      useFactory: () => ({
        hash: jest.fn(() => true),
        compare: jest.fn(() => true),
      }),
    },
    {
      provide: Jwt,
      useFactory: () => ({
        sign: jest.fn(() => 'jwt_value_key'),
      }),
    },
    UserService,
  ];
  return mock;
};
