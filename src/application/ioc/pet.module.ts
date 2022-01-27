import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetRepository } from 'src/infra/database/pets/repositories/pet.repository';
import { PetController } from 'src/presentation/controllers/pet.controller';
import { PetService } from '../services/pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetRepository])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
