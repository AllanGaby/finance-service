import 'module-alias/register'
import { FinanceTransctionType } from '@/domain/finance'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createFinanceTransactionsMigration1653763179783 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'finance_transactions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'title',
          type: 'varchar'
        },
        {
          name: 'type',
          type: 'enum',
          enumName: 'finance_transactions_types',
          enum: Object.values(FinanceTransctionType),
          default: `'${FinanceTransctionType.Debit}'`
        },
        {
          name: 'date',
          type: 'timestamp with time zone'
        },
        {
          name: 'date_str',
          type: 'varchar'
        },
        {
          name: 'value',
          type: 'decimal(15, 4)'
        },
        {
          name: 'current_portion',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'first_portion',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'last_portion',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'finance_account_id',
          type: 'uuid'
        },
        {
          name: 'transaction_category_id',
          type: 'uuid'
        },
        {
          name: 'invoice_id',
          type: 'uuid',
          isNullable: true
        },
        {
          name: 'company_id',
          type: 'uuid',
          isNullable: true
        },
        {
          name: 'original_finance_transaction_id',
          type: 'uuid',
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
        }
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'finance_transactions_fk01',
          columnNames: ['finance_account_id'],
          referencedTableName: 'finance_accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_transactions_fk02',
          columnNames: ['transaction_category_id'],
          referencedTableName: 'transaction_categories',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_transactions_fk03',
          columnNames: ['invoice_id'],
          referencedTableName: 'invoices',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_transactions_fk04',
          columnNames: ['company_id'],
          referencedTableName: 'companies',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_transactions_fk05',
          columnNames: ['original_finance_transaction_id'],
          referencedTableName: 'finance_transactions',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finance_transactions')
  }
}
