/* eslint-disable no-useless-escape */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class insertAuthenticationModuleMigration1647175091794 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into modules(name, module_key)
        values(\'Authentication\',\'authentication_module\')
      `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete from modules
        where module_key = \'authentication_module\'
      `)
  }
}
