import { BadRequestException } from '@nestjs/common';

export const isPetSituationInProcess = (situation: string) =>
  conditional[`${situation}`]();

const conditional = {
  ['sem-lar']: (): void => {
    throw new BadRequestException(
      'Pet não está em nenhum processo de adoção',
    );
  },
  ['em processo']: () => {
    return;
  },
  ['adotado']: () => {
    throw new BadRequestException('Este pet já está adotado.');
  },
};
