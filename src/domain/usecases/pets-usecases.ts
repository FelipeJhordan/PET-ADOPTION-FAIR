import { IAddPetUseCase, IListPetsUsecase } from '.';
import IDeletePet from './delete-pet-usecase';
import IUpdatePet from './update-pet-usecase';

export interface IPetUseCases
  extends IListPetsUsecase,
    IAddPetUseCase,
    IDeletePet,
    IUpdatePet {}
