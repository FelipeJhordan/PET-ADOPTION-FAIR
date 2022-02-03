import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { PetController } from 'presentation/controllers/pet.controller';
import { PetService } from '../services/pet.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PetRepository, UserRepository]),
    UserModule,
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
