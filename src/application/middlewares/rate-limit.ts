import { INestApplication } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
export const applyRateLimit = (app: INestApplication) => {
  app.use(
    rateLimit({
      windowMs: 20 * 60 * 1000, //
      max: 300,
      message: 'Muitas solicitações, espere um momento.',
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false,
    }),
  );
};
