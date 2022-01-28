import { INestApplication } from '@nestjs/common';
import bodyparser from 'body-parser';

export const applyBodyParser = (app: INestApplication) => {
  app.use(bodyparser.json({ limit: '50mb' }));
  app.use(
    bodyparser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
};
