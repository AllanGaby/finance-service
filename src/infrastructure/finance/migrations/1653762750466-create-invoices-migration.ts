import 'module-alias/register'
import { InvoiceStatus } from '@/domain/finance'
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createInvoicesMigration1653762750466 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'invoices',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'status',
          type: 'enum',
          enumName: 'invoices_status',
          enum: Object.values(InvoiceStatus),
          default: `'${InvoiceStatus.Future}'`
        },
        {
          name: 'start_date',
          type: 'timestamp with time zone'
        },
        {
          name: 'final_date',
          type: 'timestamp with time zone'
        },
        {
          name: 'due_date',
          type: 'timestamp with time zone'
        },
        {
          name: 'start_date_str',
          type: 'varchar'
        },
        {
          name: 'final_date_str',
          type: 'varchar'
        },
        {
          name: 'due_date_str',
          type: 'varchar'
        },
        {
          name: 'value',
          type: 'decimal(15, 4)'
        },
        {
          name: 'value_predict',
          type: 'decimal(15, 4)'
        },
        {
          name: 'payment_value',
          type: 'decimal(15, 4)'
        },
        {
          name: 'value_installments',
          type: 'decimal(15, 4)'
        },
        {
          name: 'finance_account_id',
          type: 'uuid'
        },
        {
          name: 'finance_account_for_payment_id',
          type: 'uuid'
        },
        {
          name: 'finance_transaction_payment_id',
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
      foreignKeys: [
        new TableForeignKey({
          name: 'invoices_fk01',
          columnNames: ['finance_account_id'],
          referencedTableName: 'finance_accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'invoices_fk02',
          columnNames: ['finance_account_for_payment_id'],
          referencedTableName: 'finance_accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invoices')
  }
}
