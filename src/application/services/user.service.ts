import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'application/protocols/hash.protocol';
import { hash } from 'bcrypt';
import { ROLE } from 'domain/models/enums/role.enum';
import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { IRegisterParams } from 'domain/protocols/users/register-params';
import { IUserUseCases } from 'domain/usecases/users/pets-usecases';
import { UserRepository } from 'infra/database/users/repositories/user.repository';

@Injectable()
export class UserService implements IUserUseCases {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private Hashing: Hash,
  ) {}

  async register(user: IRegisterParams): Promise<User> {
    const { address, email, name, password, phone, username } = user;
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists)
      throw new BadRequestException(
        'Email já registrado no sistema.',
      );

    const hashedPassword = await this.Hashing.hash(password); // ficou meio ruim o nome da classe kk
    const userBeforeSave = this.userRepository.create({
      username,
      password: hashedPassword,
      role: new Role(ROLE[ROLE.COMMON]),
      person: new Person(address, name, email, phone),
    });

    const userAfterSave = await this.userRepository.save(
      userBeforeSave,
    );

    return userAfterSave;
  }
}
