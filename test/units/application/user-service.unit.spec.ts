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
            findByEmail: jest.fn(() => false),
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

    it('Should be call userRepository.findById with email and return false if email not is duplicate', async () => {
      const findByIdSpy = jest.spyOn(userRepository, 'findByEmail');

      await userService.register(mockUserRegisterRequestDto);

      expect(findByIdSpy).toBeCalledTimes(1);
      expect(findByIdSpy).toBeCalledWith(
        mockUserRegisterRequestDto.email,
      );
      expect(findByIdSpy).toReturnWith(false);
    }); // Ficou grande em

    // it('Should throw BadRequestException if exist a user with same email', async () => {
    //   jest
    //     .spyOn(userRepository, 'findByEmail')
    //     .mockReturnValueOnce(true);
    // });
  });
});