import { Module } from '@nestjs/common';
import { PetModule } from './pet.module';

@Module({
  imports: [PetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
