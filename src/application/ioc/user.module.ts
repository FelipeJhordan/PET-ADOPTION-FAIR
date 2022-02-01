import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { UserController } from 'presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
