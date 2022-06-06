import { MigrationInterface, QueryRunner, Table, TableUnique, TableForeignKey } from 'typeorm'

export class createTransactionTagsMigration1653760535717 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'transaction_tags',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar',
          length: '100'
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
          name: 'transaction_tags_uk01',
          columnNames: ['name', 'account_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'transaction_tags_fk01',
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
    await queryRunner.dropTable('transaction_tags')
  }
}
