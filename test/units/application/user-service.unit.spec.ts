import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Hash } from 'application/protocols/hash.protocol';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import {
  mockUser,
  mockUserRegisterRequestDto,
} from '../mocks/user.mock';

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
            save: jest.fn((obj) => mockUser),
            create: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            softDelete: jest.fn(() => true),
            findByEmail: jest.fn(() => false),
          }),
        },
        {
          provide: Hash,
          useFactory: () => ({
            hash: jest.fn(() => true),
            compare: jest.fn(() => true),
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
      expect(user.username).toBe('felipejhordan');
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

    it('Should throw BadRequestException if exist a user with same email', async () => {
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockReturnValueOnce(Promise.resolve(true));

      const promise = userService.register(
        mockUserRegisterRequestDto,
      );

      expect(promise).rejects.toThrow();
      expect(promise).rejects.toBeInstanceOf(BadRequestException);
      expect(promise).rejects.toEqual(
        new BadRequestException('Email já registrado no sistema.'),
      );
    });
    it('Should call save user ', async () => {
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(async () =>
          Promise.resolve(mockUser),
        );

      await userService.register(mockUserRegisterRequestDto);

      expect(saveSpy).toBeCalled();
    });

    it('Should return saved user', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(async () =>
          Promise.resolve(mockUser),
        );
      const user = await userService.register(
        mockUserRegisterRequestDto,
      );

      expect(user).toBeTruthy();
      expect(user.username).toEqual(mockUser.username);
      expect(user.person).toBeTruthy();
      expect(user.role).toBeTruthy();
      expect(user.role.id).toBe(3);
    });
    it('Should return saved user', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(async () =>
          Promise.resolve(mockUser),
        );
      const user = await userService.register(
        mockUserRegisterRequestDto,
      );

      expect(user).toBeTruthy();
      expect(user.username).toEqual(mockUser.username);
      expect(user.person).toBeTruthy();
      expect(user.role).toBeTruthy();
      expect(user.role.id).toBe(3);
    });
    it('Should throw if throw', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockImplementationOnce(async () =>
          Promise.reject(new Error()),
        );
      const promise = userService.register(
        mockUserRegisterRequestDto,
      );
      expect(promise).rejects.toThrow(Error);
    });
  });
});
