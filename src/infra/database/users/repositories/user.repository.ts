import { User } from 'domain/models/user';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<boolean> {
    const emailExists = await this.findOne({
      where: {
        person: {
          email: email,
        },
      },
    });
    console.log(emailExists);
    return !!emailExists;
  }
}
