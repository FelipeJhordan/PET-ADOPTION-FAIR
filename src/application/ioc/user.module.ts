import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hash } from 'application/protocols/hash.protocol';
import { UserService } from 'application/services/user.service';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { BcryptAdapter } from 'infra/hash/bcrypt-adapter';
import { UserController } from 'presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Hash,
      useClass: BcryptAdapter,
    },
  ],
})
export class UserModule {}
