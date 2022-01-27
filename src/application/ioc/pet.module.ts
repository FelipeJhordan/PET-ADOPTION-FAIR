import { Module } from '@nestjs/common';
import { PetController } from 'src/presentation/controllers/pet.controller';
import { PetService } from '../services/pet.service';

@Module({
  imports: [],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
