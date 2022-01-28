import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { PetController } from 'presentation/controllers/pet.controller';
import { PetService } from '../services/pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetRepository])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
