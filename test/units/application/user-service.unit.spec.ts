import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Hash } from 'application/protocols/hash.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { mockUserServiceParams } from '../mocks/repository.mock';
import {
  mockLoginParam,
  mockUser,
  mockUserRegisterRequestDto,
} from '../mocks/user.mock';

describe('<User service>', () => {
  let userRepository: UserRepository;
  let userService: UserService;
  let hashing: Hash;
  let encrypt: Jwt;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
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
      ],
    }).compile();
    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UserService>(UserService);
    hashing = module.get<Hash>(Hash);
    encrypt = module.get<Jwt>(Jwt);
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

    it('Should call Hashing.hash with correct value', async () => {
      const hashingSpy = jest.spyOn(hashing, 'hash');
      await userService.register(mockUserRegisterRequestDto);
      expect(hashingSpy).toBeCalled();
      expect(hashingSpy).toBeCalledWith(
        mockUserRegisterRequestDto.password,
      );
    });
  });

  describe('<<User Login>> ', () => {
    it('Should return a correct ILoginResponse ', async () => {
      const auth = await userService.login(mockLoginParam);
      expect(auth).toBeTruthy();
      expect(auth.dateLogin).toBeInstanceOf(Date);
      expect(auth.token).toBeTruthy();
      expect(auth.token.length).toBeGreaterThan(10);
    });

    it('Should find user by username', async () => {
      const findOneSpy = jest.spyOn(userRepository, 'findOne');
      await userService.login(mockLoginParam);

      expect(findOneSpy).toBeCalled();
      expect(findOneSpy).toReturnWith(mockUser);
    });

    it('Should throw 403 if user not found', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockReturnValueOnce(Promise.resolve(null));
      const auth = userService.login(mockLoginParam);

      expect(auth).rejects.toThrow(UnauthorizedException);
    });

    it('Should call Hashing.compare with password and return if it`s result of match', async () => {
      const compareSpy = jest.spyOn(hashing, 'compare');
      await userService.login(mockLoginParam);

      expect(compareSpy).toBeCalled();
      expect(compareSpy).toBeCalledWith(
        mockLoginParam.password,
        mockUser.password,
      );
    });

    it('Should throw 403 if password not correct', async () => {
      jest.spyOn(hashing, 'compare').mockReturnValueOnce(null);

      const auth = userService.login(mockLoginParam);

      expect(auth).rejects.toThrow(UnauthorizedException);
    });

    it('Should encrypt using JWT and return a token', async () => {
      const signSpy = jest.spyOn(encrypt, 'sign');

      await userService.login(mockLoginParam);

      expect(signSpy).toBeCalled();
      expect(signSpy).toReturnWith('jwt_value_key');
    });

    it('Should return a same token of returned in Jwt.sign', async () => {
      const signSpy = jest.spyOn(encrypt, 'sign');

      const auth = await userService.login(mockLoginParam);

      expect(signSpy).toReturnWith(auth.token);
    });
  });
});
