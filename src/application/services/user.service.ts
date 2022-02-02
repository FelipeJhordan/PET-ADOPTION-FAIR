import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hash } from 'application/protocols/hash.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import { randomUUID } from 'crypto';
import { ROLE } from 'domain/models/enums/role.enum';
import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { ILoginParams } from 'domain/protocols/users/login-params';
import { ILoginResponse } from 'domain/protocols/users/login-response';
import { IRegisterParams } from 'domain/protocols/users/register-params';
import { IUserUseCases } from 'domain/usecases/users/user-usecases';
import { UserRepository } from 'infra/database/users/repositories/user.repository';

@Injectable()
export class UserService implements IUserUseCases {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private Hashing: Hash,
    private Jwt: Jwt,
  ) {}

  async login({
    username,
    password,
  }: ILoginParams): Promise<ILoginResponse> {
    const message = 'Credenciais inválidas';
    console.log('tou aqui');
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    console.log(user);
    if (!user) throw new UnauthorizedException(message);

    const isCorrectPassword = this.Hashing.compare(
      password,
      user.password,
    );

    if (!isCorrectPassword) throw new UnauthorizedException(message);

    const token = await this.Jwt.sign({ id: user.id });

    return {
      dateLogin: new Date(),
      token,
    };
  }

  async register(user: IRegisterParams): Promise<User> {
    const { address, email, name, password, phone, username } = user;
    const emailExists = await this.userRepository.findByEmail(email);
    console.log('tou aqui pow');
    if (emailExists)
      throw new BadRequestException(
        'Email já registrado no sistema.',
      );
    console.log(name);
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
