import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Pet } from 'src/domain/models/pet';
import { IPetUseCases } from 'src/domain/usecases/pets-usecases';
import { PetRepository } from 'src/infra/database/pets/repositories/pet.repository';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';
import UpdatePetRequestDto from 'src/shared/dtos/pet/UpdatePetRequestDto';

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
    this.petRepository.save(petFromDto);
    return petFromDto;
  }

  async deletePet(id: string): Promise<void> {
    const pet = this.petRepository.findOne(id);
    if (!pet) throw new NotFoundException();

    this.petRepository.delete(id);
  }

  async updatePet(
    id: string,
    pet: UpdatePetRequestDto,
  ): Promise<Pet> {
    const petBeforeUpdate = this.petRepository.findOne(id);

    if (!petBeforeUpdate) throw new NotFoundException();

    const petAfterUpdate = await this.petRepository
      .createQueryBuilder('pets')
      .update<Pet>(Pet, { ...pet })
      .where('pets.id = :id', { id: id })
      .returning('*')
      .updateEntity(true)
      .execute();

    return (await petAfterUpdate).raw[0];
  }
}
