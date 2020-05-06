import {MigrationInterface, QueryRunner} from "typeorm";

export class PostInformationRefactoring1588616292358 implements MigrationInterface {
    name = 'PostInformationRefactoring1588616292358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` CHANGE `information` `personalInformation` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `isImportant` `isImportant` tinyint NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `post` CHANGE `isImportant` `isImportant` tinyint(1) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `personalInformation` `information` text NULL", undefined);
    }

}
