import { Injectable } from '@nestjs/common';
import { Pet } from 'src/domain/models/pet';
import { IPetUseCases } from 'src/domain/usecases/pets-usecases';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';

@Injectable()
export class PetService implements IPetUseCases {
  pets: Pet[] = [];
  async listPets(): Promise<Pet[]> {
    return this.pets;
  }
  async addPet(pet: AddPetRequestDto): Promise<Pet> {
    const petFromDto: Pet = AddPetRequestDto.fromDto(pet);
    this.pets.push(petFromDto);

    return petFromDto;
  }
}
