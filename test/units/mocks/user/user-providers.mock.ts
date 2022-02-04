import { Jwt } from 'application/protocols/jwt.protocol';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { mockLoginResponse, mockUser } from './user.mock';
import { UserService } from 'application/services/user.service';
import { Hash } from 'application/protocols/hash.protocol';
import { UserController } from 'presentation/controllers/user.controller';

export const mockUserServiceProviders = (): Array<any> => {
  const mock = [
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

export const mockUserControllerProviders = (): Array<any> => {
  const mock = [
    UserController,
    {
      provide: UserService,
      useFactory: () => ({
        register: jest.fn(() => mockUser),
        login: jest.fn(() => mockLoginResponse),
      }),
    },
  ];

  return mock;
};
