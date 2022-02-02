import { ILoginUseCase, IRegisterUserUseCase } from '.';

export interface IUserUseCases
  extends IRegisterUserUseCase,
    ILoginUseCase {}
