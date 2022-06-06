import { MigrationInterface, QueryRunner, Table, TableUnique, TableForeignKey } from 'typeorm'

export class createFinanceUserSettingsMigration1653761708061 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'finance_user_settings',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'months_to_predict',
          type: 'integer'
        },
        {
          name: 'account_id',
          type: 'uuid'
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
        }
      ],
      uniques: [
        new TableUnique({
          name: 'finance_user_settings_uk01',
          columnNames: ['account_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'finance_user_settings_fk01',
          columnNames: ['account_id'],
          referencedTableName: 'accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finance_user_settings')
  }
}
