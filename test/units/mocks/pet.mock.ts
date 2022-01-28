import { randomUUID } from 'crypto';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';
import AddPetRequestDto from 'shared/dtos/pet/AddPetRequestDto';
import PetDto from 'shared/dtos/pet/PetDto';

const date = new Date('2022-01-28T17:00:40.390Z');

export const petMock: Pet = {
  id: randomUUID(),
  breed: 'Beagle',
  situation: SITUATION.ADOPTED,
  state: STATE.OLD,
  name: 'Beaglo',
  observation: 'Feio, porém carismático',
  createdAt: date,
  updatedAt: date,
  deletedAt: null,
};

export const petMock2: Pet = {
  id: randomUUID(),
  breed: 'yorkshire',
  situation: SITUATION.IN_PROCESS,
  state: STATE.ADULT,
  name: 'lulu',
  observation: 'Faz muita arte, porém é carinhosa',
  createdAt: date,
  updatedAt: date,
  deletedAt: null,
};

export const petDtoMock: PetDto = PetDto.toDto(petMock);
export const addPetRequestDTO: AddPetRequestDto = {
  ...petDtoMock,
};

export const petsMock: Pet[] = [petMock, petMock2];
