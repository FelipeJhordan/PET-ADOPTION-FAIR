import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createRelationshipPetsUsers1643991346771
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner
      .addColumn(
        'pets',
        new TableColumn({
          name: 'id_user',
          type: 'UNIQUEIDENTIFIER',
          isNullable: true,
        }),
      )
      .then(() => {
        queryRunner.createForeignKey(
          'pets',
          new TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            name: 'fk_pets_users',
          }),
        );
      });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pets', 'fk_pets_user');
    await queryRunner.dropColumn('pets', 'id_user');
  }
}
