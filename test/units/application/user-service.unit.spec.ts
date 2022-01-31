import { Test } from '@nestjs/testing';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { mockUserRegisterRequestDto } from '../mocks/user.mock';

describe('<User service>', () => {
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

  describe('<<User Register>> ', () => {
    it('Should be return a valid user ', async () => {
      const user = await userService.register(
        mockUserRegisterRequestDto,
      );

      expect(user).toBeTruthy();
      expect(user.username).toBe('felipe jhordan');
    });

    it('Should be called with valid params', async () => {
      const registerSpy = jest.spyOn(userService, 'register');

      userService.register(mockUserRegisterRequestDto);

      expect(registerSpy).toHaveBeenCalledWith(
        mockUserRegisterRequestDto,
      );
    });
  });
});
