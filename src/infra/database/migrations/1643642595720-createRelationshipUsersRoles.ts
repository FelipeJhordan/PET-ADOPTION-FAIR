import {
  MigrationInterface,
  QueryRunner,
  QueryRunnerAlreadyReleasedError,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createRelationshipUsersRoles1643642595720
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .addColumn(
        'users',
        new TableColumn({
          name: 'role',
          type: 'int',
        }),
      )
      .then(() => {
        queryRunner.createForeignKey(
          'users',
          new TableForeignKey({
            columnNames: ['role'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            name: 'fk_users_roles',
          }),
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'fk_users_roles');
    await queryRunner.dropColumn('users', 'role');
  }
}
