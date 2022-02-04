import { ClassTransformer, plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ROLE } from 'domain/models/enums/role.enum';
import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { ILoginParams } from 'domain/protocols/users/login-params';
import { ILoginResponse } from 'domain/protocols/users/login-response';
import { LoginRequestDto } from 'shared/dtos/user/LoginRequestDto';

const date = new Date('2022-01-28T17:00:40.390Z');

export const mockUserRegisterRequestDto = {
  email: 'felipejordan.alves@gmail.com',
  name: 'felipe jhordan',
  address: 'Rua Mônica Machiyama',
  username: 'felipejhordan',
  password: '123',
  phone: '3499757878',
};

export const mockUser: User = {
  id: randomUUID(),
  username: 'felipejhordan',
  password: '123',
  role: new Role(ROLE[ROLE.COMMON]),
  person: new Person(
    'Rua Mônica Machiyama',
    'felipe jhordan',
    'felipejordan.alves@gmail.com',
    '3499757878',
  ),
  createdAt: date,
  updatedAt: date,
  deletedAt: null,
};

export const mockSaveParam = () => {
  const { username, password, email, address, name, phone } =
    mockUserRegisterRequestDto;
  return {
    username,
    password,
    role: new Role(ROLE[ROLE.COMMON]),
    person: new Person(address, name, email, phone),
  };
};

export const mockLoginParam: ILoginParams = {
  username: 'felipejhordan',
  password: '12345',
  passwordConfirmation: '12345',
};

export const mockLoginResponse: ILoginResponse = {
  token: 'valid_toten_response',
  dateLogin: date,
};

export const mockLoginParamController = plainToClass(
  LoginRequestDto,
  mockLoginParam,
);
