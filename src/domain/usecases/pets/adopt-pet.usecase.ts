import { IAdoptPetParams } from 'domain/protocols/pets/adopt-pet-params';

export interface IAdoptPetUsecase {
  adoptPet(pet: IAdoptPetParams): Promise<void>;
}
