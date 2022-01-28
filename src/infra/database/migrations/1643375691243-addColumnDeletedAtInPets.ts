import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

export class addColumnDeletedAtInPets1643375691243
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pets',
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pets', 'deletedAt');
  }
}
