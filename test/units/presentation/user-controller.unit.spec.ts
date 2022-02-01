import { Test } from '@nestjs/testing';
import { UserService } from 'application/services/user.service';
import { UserController } from 'presentation/controllers/user.controller';
import {
  mockUser,
  mockUserRegisterRequestDto,
} from '../mocks/user.mock';

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
  });
});
