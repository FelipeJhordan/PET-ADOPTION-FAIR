import { IAddPetUseCase, IListPetsUsecase } from '.';
import IDeletePet from './delete-pet-usecase';
import IShowById from './show-pet-by-id-usecase';
import IUpdatePet from './update-pet-usecase';

export interface IPetUseCases
  extends IListPetsUsecase,
    IAddPetUseCase,
    IDeletePet,
    IUpdatePet,
    IShowById {}
