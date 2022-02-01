import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IRegisterParams } from 'domain/protocols/users/register-params';

export default class RegisterRequestDto implements IRegisterParams {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsPhoneNumber('BR')
  phone: string;
}
