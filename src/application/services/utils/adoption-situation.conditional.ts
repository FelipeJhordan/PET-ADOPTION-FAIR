import { BadRequestException } from '@nestjs/common';

export const adoptionSituationException = (situation: string) =>
  conditional[`${situation}`]();

const conditional = {
  ['sem-lar']: (): void => {
    return;
  },
  ['em processo']: () => {
    throw new BadRequestException(
      'Pet já está em processo de adoçãoo',
    );
  },
  ['adotado']: () => {
    throw new BadRequestException('Este pet já está adotado.');
  },
};
