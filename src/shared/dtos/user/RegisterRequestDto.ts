import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'username',
  })
  username: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fcer12734-',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fulano de tal da silva',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rua ciclano, 167',
  })
  address: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'fulanodasilva123@mail.com',
  })
  email: string;
  @IsPhoneNumber('BR')
  @ApiProperty({
    example: '(34) 997188545',
  })
  phone: string;
}
