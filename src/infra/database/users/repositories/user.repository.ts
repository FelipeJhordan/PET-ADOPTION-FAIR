import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<boolean> {
    const emailExists = await this.findOne({
      relations: ['person'],
      where: {
        person: {
          email: email,
        },
      },
    });

    return !!emailExists;
  }

  async findByIdAndReturnRole(id: string) {
    const role = await this.createQueryBuilder('u')
      .select(['role.id', 'role.name'])
      .leftJoin('u.role', 'role')
      .where('u.id = :userId', { userId: id })
      .execute();
    return role[0];
  }
}
