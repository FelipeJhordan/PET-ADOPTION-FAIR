import { Test } from '@nestjs/testing';
import { PetService } from 'application/services/pet.service';
import { PetController } from 'presentation/controllers/pet.controller';
import { petsMock } from '../mocks/pet.mock';

describe('PetsController Test', () => {
  let petController: PetController;
  let petService: PetService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PetController,
        {
          provide: PetService,
          useFactory: () => ({
            listPets: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    petService = module.get<PetService>(PetService);
    petController = module.get<PetController>(PetController);
  });

  it('should return a list of pets when GET /pets/', async () => {
    jest
      .spyOn(petService, 'listPets')
      .mockReturnValueOnce(Promise.resolve(petsMock));

    const pets = await petController.listPets();

    expect(pets.length > 0);
    expect(pets[0].breed).toBeTruthy();
    expect(pets[0].name).toEqual(petsMock[0].name);
  });

  // TODO
  // Should have here all methods in presentation layer pets
  // like as add, remove, update, show
});
