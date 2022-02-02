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
      provide: Hash, // Isso permite que qualquer um que extende Hash possa ser utilizado/injetado em algum lugar da aplicação
      useClass: BcryptAdapter, // Poderia ser utilizado um factory function que retorna um objeto com que segue a interface do Hash
    },
  ],
})
export class UserModule {}
