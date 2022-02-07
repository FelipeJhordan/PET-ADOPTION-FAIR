import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Feira de adoção de animais de estimação')
  .setDescription('The cats Api description')
  .setVersion('1.0')
  .build(); // builder hehe
