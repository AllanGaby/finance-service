import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique } from 'typeorm'

export class createFinanceTransactionTagsMigration1653908698341 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'finance_transaction_tags',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'finance_transaction_id',
          type: 'uuid'
        },
        {
          name: 'transaction_tag_id',
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
          name: 'finance_transaction_tags_uk01',
          columnNames: ['finance_transaction_id', 'transaction_tag_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'finance_transaction_tags_fk01',
          columnNames: ['finance_transaction_id'],
          referencedTableName: 'finance_transactions',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_transaction_tags_fk02',
          columnNames: ['transaction_tag_id'],
          referencedTableName: 'transaction_tags',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finance_transaction_tags')
  }
}
