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
        await queryRunner.manager.query(
          'INSERT INTO "users"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "role", "id_person") VALUES (DEFAULT, $1, $2, DEFAULT, DEFAULT, DEFAULT, $3, $4) RETURNING "id", "createdAt", "updatedAt", "deletedAt"',
          [
            'ADMIN',
            await new BcryptAdapter().hash(
              process.env.ADMIN_PASSWORD,
            ),
            1,
            returnedValue.raw[0].id,
          ],
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('users', {});
    await queryRunner.manager.delete('persons', {});
  }
}
