import { Test } from '@nestjs/testing';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';

describe('User service', () => {
  let userRepository: UserRepository;
  let userService: UserService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            save: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            softDelete: jest.fn(() => true),
            updateAndGetPetById: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UserService>(UserService);
  });

  it('Should be return a valid user ', async () => {
    const user = await userService.register({
      email: 'felipejordan.alves@gmail.com',
      name: 'felipe jhordan',
      address: 'Rua Mônica Machiyama',
      username: 'felipejhordan',
      password: '123',
      phone: '3499757878',
    });

    expect(user).toBeTruthy();
    expect(user.username).toBe('felipe jhordan');
  });
});
