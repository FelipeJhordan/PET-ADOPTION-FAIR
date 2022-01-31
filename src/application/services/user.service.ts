import { Injectable } from '@nestjs/common';
import { Person } from 'domain/models/person';
import { User } from 'domain/models/user';
import { IRegisterParams } from 'domain/protocols/users/register-params';
import { IUserUseCases } from 'domain/usecases/users/pets-usecases';

@Injectable()
export class UserService implements IUserUseCases {
  async register(user: IRegisterParams): Promise<User> {
    return new User(
      user.name,
      user.password,
      new Person(user.address, user.name, user.email, user.phone),
    );
  }
}
