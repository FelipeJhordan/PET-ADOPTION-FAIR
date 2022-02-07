import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'application/services/user.service';
import { LoginRequestDto } from 'shared/dtos/user/LoginRequestDto';
import { ILoginResponseDto } from 'shared/dtos/user/LoginResponseDto';
import RegisterRequestDto from 'shared/dtos/user/RegisterRequestDto';
import { UserDto } from 'shared/dtos/user/UserDto';

@ApiTags('users')
@Controller('/users') // Deveria ter um controller só para funções de login /auth ou um /login -- mas deixa queto kk
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  public async register(
    @Body() userData: RegisterRequestDto,
  ): Promise<UserDto> {
    const user = await this.userService.register(userData);

    return UserDto.toDto(user);
  }

  @Post('/login')
  @HttpCode(200)
  public async login(
    @Body() auth: LoginRequestDto,
  ): Promise<ILoginResponseDto> {
    const dataLogin = await this.userService.login(auth);
    return dataLogin;
  }
}
