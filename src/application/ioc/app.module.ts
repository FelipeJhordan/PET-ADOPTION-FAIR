import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModule } from './pet.module';

@Module({
  imports: [PetModule, TypeOrmModule.forRoot({})],
  controllers: [],
  providers: [],
})
export class AppModule {}
