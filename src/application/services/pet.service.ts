import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { Pet } from 'domain/models/pet';
import { IAcceptAdoptParams } from 'domain/protocols/pets/accept-adopt-params';
import { IAdoptPetParams } from 'domain/protocols/pets/adopt-pet-params';
import { IPetUseCases } from 'domain/usecases/pets/pets-usecases';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import AddPetRequestDto from 'shared/dtos/pet/AddPetRequestDto';
import UpdatePetRequestDto from 'shared/dtos/pet/UpdatePetRequestDto';
import { isPetSituationHomeless } from './utils/is-pet-situation-homeless.conditional';
import { isPetSituationInProcess } from './utils/is-pet-situation-in-process.conditional';

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

    const petAfterUpdate =
      await this.petRepository.updateAndGetPetById(id, pet);

    return petAfterUpdate;
  }

  async showById(id: string): Promise<Pet> {
    this.logger.log('Show pet with id:' + id);

    const pet = await this.petRepository.findOne(id);
    if (!pet) throw new NotFoundException();

    return pet;
  }

  async adoptPet({
    id_pet,
    id_user,
  }: IAdoptPetParams): Promise<void> {
    // n??o preciso verificar o usu??rio pois se chegou aqui ele passou pelo authGuard
    const petReturned = await this.petRepository.findOne(id_pet);
    if (!petReturned)
      throw new NotFoundException('Pet n??o encontrado.');
    isPetSituationHomeless(petReturned.situation);
    await this.petRepository.update(id_pet, {
      user: {
        id: id_user,
      },
      situation: SITUATION.IN_PROCESS,
    });
  }

  async acceptAdopt({
    id_pet,
    id_user,
  }: IAcceptAdoptParams): Promise<void> {
    const petReturned = await this.petRepository.findOne(id_pet);
    if (!petReturned) {
      throw new NotFoundException('Pet n??o encontrado.');
    }
    isPetSituationInProcess(petReturned.situation);
    if (petReturned.user.id === id_user) {
      throw new BadRequestException(
        'O atendente n??o t??m permiss??o para aceitar o pedido de ado????o para si pr??prio.',
      );
    }

    await this.petRepository.update(id_pet, {
      situation: SITUATION.ADOPTED,
    });
  }
}
