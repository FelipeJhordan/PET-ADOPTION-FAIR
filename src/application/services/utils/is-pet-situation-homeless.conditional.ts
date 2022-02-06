import { BadRequestException } from '@nestjs/common';

export const isPetSituationHomeless = (situation: string) =>
  conditional[`${situation}`]();

const conditional = {
  ['sem-lar']: (): void => {
    return;
  },
  ['em processo']: () => {
    throw new BadRequestException(
      'Pet já está em processo de adoção',
    );
  },
  ['adotado']: () => {
    throw new BadRequestException('Este pet já está adotado.');
  },
};
