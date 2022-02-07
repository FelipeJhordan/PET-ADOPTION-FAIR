import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRoles1643636654482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'identity',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
    );

    const PAPERS = ['ADMIN', 'CLERK', 'COMMON'];
    let i = 0;
    const promises = PAPERS.map((role) => {
      queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('roles')
        .values({
          name: role,
          id: ++i,
        })
        .execute();
    });

    Promise.all(promises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
