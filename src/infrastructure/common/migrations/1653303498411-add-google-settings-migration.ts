import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addGoogleSettingsMigration1653303498411 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('authentication_settings', [
      new TableColumn({
        name: 'google_client_id',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_client_secret',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_callback_url',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_scopes',
        type: 'varchar',
        isNullable: true
      })
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('authentication_settings', [
      new TableColumn({
        name: 'google_client_id',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_client_secret',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_callback_url',
        type: 'varchar',
        isNullable: true
      }),
      new TableColumn({
        name: 'google_scopes',
        type: 'varchar',
        isNullable: true
      })
    ])
  }
}
