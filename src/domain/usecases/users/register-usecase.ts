import { User } from 'domain/models/user';
import { IRegisterParams } from 'domain/protocols/users/register-params';

export interface IRegisterUserUseCase {
  register(user: IRegisterParams): Promise<User>;
}
