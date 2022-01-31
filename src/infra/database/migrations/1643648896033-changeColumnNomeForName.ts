import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeColumnNomeForName1643648896033
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('persons', 'nome', 'name');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('persons', 'name', 'nome');
  }
}
