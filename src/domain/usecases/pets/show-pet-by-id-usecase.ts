import { Pet } from '../../models/pet';

export default interface IShowById {
  showById(id: string): Promise<Pet>;
}
