import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Person } from 'domain/models/person';

export class PersonDto {
  @Expose()
  @Exclude()
  id: string;
  @Expose()
  name: string;
  @Expose()
  address: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt: Date;

  static toDto(person: Person): PersonDto {
    return plainToClass(PersonDto, person, {
      excludeExtraneousValues: true,
    });
  }
}
