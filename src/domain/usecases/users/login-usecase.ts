import { ILoginParams } from 'domain/protocols/users/login-params';
import { ILoginResponse } from 'domain/protocols/users/login-response';

export interface ILoginUseCase {
  login(login: ILoginParams): Promise<ILoginResponse>;
}
