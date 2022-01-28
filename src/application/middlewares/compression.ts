import { INestApplication } from '@nestjs/common';
import compression from 'compression';
export const applyCompression = (app: INestApplication) => {
  app.use(compression());
};
