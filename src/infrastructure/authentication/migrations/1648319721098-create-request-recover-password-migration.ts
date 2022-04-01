import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createRequestRecoverPasswordMigration1648319721098 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'request_recover_passwords',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      },
      {
        name: 'authentication_secret',
        type: 'varchar',
        length: '200'
      },
      {
        name: 'validation_code',
        type: 'varchar',
        length: '200'
      },
      {
        name: 'account_id',
        type: 'uuid'
      },
      {
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true
      },
      {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()'
      }],
      foreignKeys: [
        new TableForeignKey({
          name: 'request_recover_passwords_fk01',
          columnNames: ['account_id'],
          referencedTableName: 'accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('request_recover_passwords')
  }
}
