import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const applyHelmet = (app: INestApplication) => {
  app.use(helmet());
};
