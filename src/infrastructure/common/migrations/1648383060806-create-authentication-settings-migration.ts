import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createAuthenticationSettingsMigration1648383060806 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'authentication_settings',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'version',
        isPrimary: true,
        type: 'int',
        default: '1'
      }, {
        name: 'smtp_sender_email',
        type: 'varchar',
        length: '100',
        isNullable: true
      }, {
        name: 'smtp_sender_name',
        type: 'varchar',
        length: '100',
        isNullable: true
      }, {
        name: 'smtp_auth_account',
        type: 'varchar',
        length: '100',
        isNullable: true
      }, {
        name: 'smtp_auth_password',
        type: 'varchar',
        length: '100',
        isNullable: true
      }, {
        name: 'smtp_service',
        type: 'varchar',
        length: '100',
        isNullable: true
      }, {
        name: 'enabled_send_mail',
        type: 'boolean',
        isNullable: true
      }, {
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()'
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('authentication_settings')
  }
}
