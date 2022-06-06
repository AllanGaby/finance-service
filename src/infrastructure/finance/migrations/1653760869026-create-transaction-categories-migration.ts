import { MigrationInterface, QueryRunner, Table, TableUnique, TableForeignKey } from 'typeorm'

export class createTransactionCategoriesMigration1653760869026 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'transaction_categories',
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
          name: 'credit',
          type: 'boolean',
          default: true
        },
        {
          name: 'debit',
          type: 'boolean',
          default: true
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
          name: 'transaction_categories_uk01',
          columnNames: ['name', 'account_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'transaction_categories_fk01',
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
    await queryRunner.dropTable('transaction_categories')
  }
}
