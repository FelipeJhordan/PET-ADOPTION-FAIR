import { create } from 'domain';
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createRelationshipUsersPersons1643646812783
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .addColumn(
        'users',
        new TableColumn({
          name: 'id_person',
          type: 'uuid',
        }),
      )
      .then(() => {
        queryRunner.createForeignKey(
          'users',
          new TableForeignKey({
            columnNames: ['id_person'],
            referencedColumnNames: ['id'],
            referencedTableName: 'persons',
            name: 'fk_users_peoples',
          }),
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'fk_users_peoples');
    await queryRunner.dropColumn('users', 'id_person');
  }
}
