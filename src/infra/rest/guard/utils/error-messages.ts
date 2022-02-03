import { UnauthorizedException } from '@nestjs/common';

export const callError = {
  tokenInvalid: new UnauthorizedException('You token is invalid'),
  noAuthorized: new UnauthorizedException(
    'You are not authorized for this action',
  ),
  noToken: new UnauthorizedException('You do not have token'),
};
