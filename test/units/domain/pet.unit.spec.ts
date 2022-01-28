import { Pet } from 'domain/models/pet';
import { petMock } from '../mocks/pet.mock';

describe('Pet tests', () => {
  const petmocked = petMock;

  it('Should create a pet', () => {
    const {
      id,
      breed,
      observation,
      deletedAt,
      updatedAt,
      createdAt,
      name,
      state,
      situation,
    } = petmocked;
    const pet = new Pet(
      breed,
      state,
      situation,
      name,
      observation,
      id,
      deletedAt,
      createdAt,
      updatedAt,
    );

    expect(pet instanceof Pet).toBeTruthy();
    expect(pet).toEqual(petmocked);
  });
});
