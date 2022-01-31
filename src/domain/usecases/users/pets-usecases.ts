import {
  IAddPetUseCase,
  IListPetsUsecase,
  IRegisterUserUseCase,
} from '.';
import IDeletePet from './delete-pet-usecase';
import IShowById from './show-pet-by-id-usecase';
import IUpdatePet from './update-pet-usecase';

export type IUserUseCases = IRegisterUserUseCase;
