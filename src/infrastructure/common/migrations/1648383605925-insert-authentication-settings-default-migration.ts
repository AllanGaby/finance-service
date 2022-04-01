import { MigrationInterface, QueryRunner } from 'typeorm'

export class insertAuthenticationSettingsDefaultMigration1648383605925 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('insert into authentication_settings (enabled_send_mail) values(false)')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('delete from authentication_settings')
  }
}
