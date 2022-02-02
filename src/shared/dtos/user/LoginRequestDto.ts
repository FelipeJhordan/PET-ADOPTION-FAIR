import { Expose } from 'class-transformer';
import {
  Equals,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { ILoginParams } from 'domain/protocols/users/login-params';
import { CustomMatchPasswords } from 'infra/class-validator/custom-match-passwords';
import { password } from '../../../../ormconfig';

export class LoginRequestDto implements ILoginParams {
  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
  @Validate(CustomMatchPasswords, ['password'])
  @Expose()
  @IsNotEmpty()
  @Equals(password)
  passwordConfirmation: string;
}
