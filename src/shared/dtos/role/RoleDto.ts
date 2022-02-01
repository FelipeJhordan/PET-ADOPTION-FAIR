import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Role } from 'domain/models/role';

export class RoleDto {
  @Exclude()
  id: string;

  @Expose()
  name: string;

  static toDto(role: Role): RoleDto {
    return plainToClass(RoleDto, role, {
      excludeExtraneousValues: true,
    });
  }
}
