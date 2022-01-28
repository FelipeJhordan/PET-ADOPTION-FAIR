import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/domain/models/pet';
import { IPetUseCases } from 'src/domain/usecases/pets-usecases';
import { PetRepository } from 'src/infra/database/pets/repositories/pet.repository';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';
import UpdatePetRequestDto from 'src/shared/dtos/pet/UpdatePetRequestDto';

@Injectable()
export class PetService implements IPetUseCases {
  private readonly logger = new Logger(PetService.name);

  constructor(
    @InjectRepository(PetRepository)
    private petRepository: PetRepository,
  ) {}

  async listPets(): Promise<Pet[]> {
    this.logger.log('Find all pets');
    return this.petRepository.find({
      where: {
        deletedAt: null,
      },
    });
  }
  async addPet(pet: AddPetRequestDto): Promise<Pet> {
    this.logger.log(`Add pet ${JSON.stringify(pet)}`);
    const petFromDto: Pet = AddPetRequestDto.fromDto(pet);
    this.petRepository.save(petFromDto);
    return petFromDto;
  }

  async deletePet(id: string): Promise<void> {
    this.logger.log('Delete pet with id:' + id);
    const pet = await this.petRepository.findOne(id);
    if (!pet) throw new NotFoundException();

    this.petRepository.softDelete(id);
  }

  async updatePet(
    id: string,
    pet: UpdatePetRequestDto,
  ): Promise<Pet> {
    this.logger.log(
      `Update pet by id:${id} with ${JSON.stringify(pet)}`,
    );

    const petBeforeUpdate = await this.petRepository.findOne(id);

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

  async showById(id: string): Promise<Pet> {
    this.logger.log('Show pet with id:' + id);

    const pet = await this.petRepository.findOne(id);
    if (!pet) throw new NotFoundException();

    return pet;
  }
}
