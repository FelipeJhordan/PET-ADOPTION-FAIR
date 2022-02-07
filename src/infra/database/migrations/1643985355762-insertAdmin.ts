import { BcryptAdapter } from 'infra/hash/bcrypt-adapter';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertAdmin1643985355762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('persons')
      .values({
        name: 'ADMIN',
        address: 'ADMIN_ADDRESS',
        email: 'ADMIN@UOL.COM',
        phone: '(34) 99712-3123',
      })
      .returning(['id'])
      .execute()
      .then(async (returnedValue) => {
        const hash = await new BcryptAdapter().hash(
          process.env.ADMIN_PASSWORD,
        );
        const id_user = returnedValue.raw[0].id;
        await queryRunner.manager.query(
          `INSERT INTO "users"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "role", "id_person") VALUES (DEFAULT,'ADMIN', '${hash}', DEFAULT, DEFAULT, DEFAULT, 1, '${id_user}');`,
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('users', {});
    await queryRunner.manager.delete('persons', {});
  }
}
