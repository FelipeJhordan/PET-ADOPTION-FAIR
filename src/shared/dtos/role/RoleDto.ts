import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { ROLE } from 'domain/models/enums/role.enum';
import { Role } from 'domain/models/role';

export class RoleDto {
  @Exclude()
  id: string;

  @Expose()
  @ApiProperty({
    enum: ROLE,
  })
  name: string;

  static toDto(role: Role): RoleDto {
    return plainToClass(RoleDto, role, {
      excludeExtraneousValues: true,
    });
  }
}
