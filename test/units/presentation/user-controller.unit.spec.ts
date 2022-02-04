import { Test } from '@nestjs/testing';
import { UserService } from 'application/services/user.service';
import { UserController } from 'presentation/controllers/user.controller';
import RegisterRequestDto from 'shared/dtos/user/RegisterRequestDto';
import { validate } from 'class-validator';
import {
  mockLoginParam,
  mockLoginResponse,
  mockUser,
  mockUserRegisterRequestDto,
} from '../mocks/user/user.mock';
import { plainToInstance } from 'class-transformer';
import { mockUserControllerProviders } from '../mocks/user/user-providers.mock';

describe('<User Controller>', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: await mockUserControllerProviders(),
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('<<User Register>>', () => {
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

    it('Should return the user created', async () => {
      const userPromise = userController.register(
        mockUserRegisterRequestDto,
      );
      expect(userPromise).resolves.not.toThrowError();

      const user = await userPromise;

      expect(user.createdAt).toBeTruthy();
    });
  });
  describe('<< User Login >>', () => {
    it('Should call userService.login', async () => {
      const loginSpy = jest.spyOn(userService, 'login');
      userController.login(mockLoginParam);

      expect(loginSpy).toBeCalled();
      expect(loginSpy).toBeCalledWith(mockLoginParam);
    });

    it('Should userController.login return the correct LoginRequestDto values', async () => {
      const auth = await userController.login(mockLoginParam);

      expect(auth).toBeTruthy();
    });

    it('Should throw if userService throws', async () => {
      jest
        .spyOn(userService, 'login')
        .mockReturnValueOnce(Promise.reject(new Error()));
      const auth = userController.login(mockLoginParam);
      expect(auth).rejects.toThrow();
    });
  });
});
