export default interface IDeletePet {
  deletePet(id: string): Promise<void>;
}
