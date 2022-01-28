import { INestApplication } from '@nestjs/common';
import { applyBodyParser } from './body-parser';
import { applyCompression } from './compression';
import { applyHelmet } from './helmet';
import { applyRateLimit } from './rate-limit';

export const applyMiddlewares = (app: INestApplication) => {
  applyCompression(app);
  applyHelmet(app);
  applyBodyParser(app);
  applyRateLimit(app);
};
