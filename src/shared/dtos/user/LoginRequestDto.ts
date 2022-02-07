import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { ILoginParams } from 'domain/protocols/users/login-params';
import { CustomMatchPasswords } from 'infra/class-validator/custom-match-passwords';

export class LoginRequestDto implements ILoginParams {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'username',
  })
  username: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Fcer12734-',
  })
  password: string;
  @Validate(CustomMatchPasswords, ['password'])
  @Expose()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fcer12734-',
  })
  passwordConfirmation: string;
}
