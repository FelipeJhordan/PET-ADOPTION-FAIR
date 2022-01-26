import { SITUATION } from './enums/situation.enum';
import { STATE } from './enums/state.enum';

export default class Pet {
  id: string;
  name?: string;
  breed: string;
  state: STATE;
  observation?: string;
  situation: SITUATION;
}
