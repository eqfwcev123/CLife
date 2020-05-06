import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1588601839022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE post CHANGE isImportant IsImportant boolean `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE post CHANGE IsImportant isImportant boolean `
    );
  }
}
