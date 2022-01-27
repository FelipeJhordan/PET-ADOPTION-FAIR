import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/domain/models/pet';
import { IPetUseCases } from 'src/domain/usecases/pets-usecases';
import { PetRepository } from 'src/infra/database/pets/repositories/pet.repository';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';

@Injectable()
export class PetService implements IPetUseCases {
  constructor(
    @InjectRepository(PetRepository)
    private petRepository: PetRepository,
  ) {}
  async listPets(): Promise<Pet[]> {
    return this.petRepository.find();
  }
  async addPet(pet: AddPetRequestDto): Promise<Pet> {
    const petFromDto: Pet = AddPetRequestDto.fromDto(pet);

    return petFromDto;
  }
}
