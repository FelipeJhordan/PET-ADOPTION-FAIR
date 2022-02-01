import {
  Exclude,
  Expose,
  plainToClass,
  Type,
} from 'class-transformer';
import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { PersonDto } from '../person/PersonDto';
import { RoleDto } from '../role/RoleDto';

export class UserDto {
  @Exclude()
  id: string;
  @Expose()
  username?: string;
  @Exclude()
  password: string;
  @Type(() => RoleDto)
  @Expose()
  role?: Role;
  @Type(() => PersonDto)
  @Expose()
  person?: Person;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt?: Date;

  static toDto(user: UserDto): UserDto {
    return plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
