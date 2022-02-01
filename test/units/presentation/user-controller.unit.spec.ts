import { Test } from '@nestjs/testing';
import { UserService } from 'application/services/user.service';
import { UserController } from 'presentation/controllers/user.controller';
import RegisterRequestDto from 'shared/dtos/user/RegisterRequestDto';
import { validate } from 'class-validator';
import {
  mockUser,
  mockUserRegisterRequestDto,
} from '../mocks/user.mock';
import { plainToInstance } from 'class-transformer';

describe('<User Controller>', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: UserService,
          useFactory: () => ({
            register: jest.fn(() => mockUser),
          }),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('<User Register>', () => {
    it('Should call userService.register', async () => {
      const registerSpy = jest.spyOn(userService, 'register');
      await userController.register(mockUserRegisterRequestDto);

      expect(registerSpy).toBeCalled();
    });

    // maybe it would be better if to be in a test directory for infra layer, but ok!
    it('Should validate params with valid pipe|class validator', async () => {
      const bodyRequest = plainToInstance(
        RegisterRequestDto,
        mockUserRegisterRequestDto,
      );

      const errors = await validate(bodyRequest);
      expect(errors.length).toBe(0);
    });
    it('Should validate params with valid pipe|class validator with incorrect values', async () => {
      const bodyRequest = plainToInstance(RegisterRequestDto, {
        ...mockUserRegisterRequestDto,
        email: 'felipejhordan',
      });

      const errors = await validate(bodyRequest);
      expect(errors.length).toBe(1);
    });
  });
});
