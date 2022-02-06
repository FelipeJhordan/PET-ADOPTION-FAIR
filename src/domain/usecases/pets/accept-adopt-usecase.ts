import { IAcceptAdoptParams } from 'domain/protocols/pets/accept-adopt-params';

export interface IAcceptAdopt {
  acceptAdopt(iAcceptAdoptParams: IAcceptAdoptParams): Promise<void>;
}
