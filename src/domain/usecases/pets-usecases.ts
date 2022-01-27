import { IAddPetUseCase, IListPetsUsecase } from '.';

export interface IPetUseCases
  extends IListPetsUsecase,
    IAddPetUseCase {}
