import { IRegisterParams } from 'domain/protocols/users/register-params';

export default class RegisterRequestDto implements IRegisterParams {
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}
