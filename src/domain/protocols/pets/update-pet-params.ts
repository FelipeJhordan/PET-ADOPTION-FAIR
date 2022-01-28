import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';

export interface IUpdatePetParams {
  name: string;
  breed?: string;

  state?: STATE;

  observation?: string;

  situation?: SITUATION;
}
