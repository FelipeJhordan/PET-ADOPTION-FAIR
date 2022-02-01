import { randomUUID } from 'crypto';
import { ROLE } from 'domain/models/enums/role.enum';
import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';

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
