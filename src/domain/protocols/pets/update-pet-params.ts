import { SITUATION } from 'src/domain/models/enums/situation.enum';
import { STATE } from 'src/domain/models/enums/state.enum';

export interface IUpdatePetParams {
  name: string;
  breed?: string;

  state?: STATE;

  observation?: string;

  situation?: SITUATION;
}
