import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'domain/models/person';
import { User } from 'domain/models/user';
import { IRegisterParams } from 'domain/protocols/users/register-params';
import { IUserUseCases } from 'domain/usecases/users/pets-usecases';
import { UserRepository } from 'infra/database/users/repositories/user.repository';

@Injectable()
export class UserService implements IUserUseCases {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(user: IRegisterParams): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(
      user.email,
    );
    if (emailExists)
      throw new BadRequestException(
        'Email já registrado no sistema.',
      );
    return new User(
      user.name,
      user.password,
      new Person(user.address, user.name, user.email, user.phone),
    );
  }
}
