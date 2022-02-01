import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'application/services/user.service';
import { User } from 'domain/models/user';
import RegisterRequestDto from 'shared/dtos/user/RegisterRequestDto';

@Controller('/users') // Deveria ter um controller só para funções de login /auth ou um /login -- mas deixa queto kk
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async register(
    @Body() userData: RegisterRequestDto,
  ): Promise<User> {
    return this.userService.register(userData);
  }
}
