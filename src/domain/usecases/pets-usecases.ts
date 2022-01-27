import { IAddPetUseCase, IListPetsUsecase } from '.';
import IDeletePet from './delete-pet-usecase';

export interface IPetUseCases
  extends IListPetsUsecase,
    IAddPetUseCase,
    IDeletePet {}
