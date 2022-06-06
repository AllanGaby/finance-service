import 'module-alias/register'
import { FinanceAccountType } from '@/domain/finance'
import { MigrationInterface, QueryRunner, Table, TableUnique, TableForeignKey } from 'typeorm'

export class createFinanceAccountsMigration1653762162451 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'finance_accounts',
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
          name: 'type',
          type: 'enum',
          enumName: 'finance_accounts_types',
          enum: Object.values(FinanceAccountType),
          default: `'${FinanceAccountType.Banking}'`
        },
        {
          name: 'account_id',
          type: 'uuid'
        },
        {
          name: 'company_id',
          type: 'uuid',
          isNullable: true
        },
        {
          name: 'closing_date',
          type: 'timestamp with time zone',
          isNullable: true
        },
        {
          name: 'due_date',
          type: 'timestamp with time zone',
          isNullable: true
        },
        {
          name: 'credit_date',
          type: 'timestamp with time zone',
          isNullable: true
        },
        {
          name: 'closing_date_str',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'due_date_str',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'credit_date_str',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'default_credit_value',
          type: 'decimal(15, 4)',
          isNullable: true
        },
        {
          name: 'default_credit_released',
          type: 'decimal(15, 4)',
          isNullable: true
        },
        {
          name: 'default_finance_account_for_payment_id',
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
      uniques: [
        new TableUnique({
          name: 'finance_accounts_uk01',
          columnNames: ['name', 'account_id']
        })
      ],
      foreignKeys: [
        new TableForeignKey({
          name: 'finance_accounts_fk01',
          columnNames: ['account_id'],
          referencedTableName: 'accounts',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_accounts_fk02',
          columnNames: ['company_id'],
          referencedTableName: 'companies',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }),
        new TableForeignKey({
          name: 'finance_accounts_fk03',
          columnNames: ['default_finance_account_for_payment_id'],
          referencedTableName: 'finance_accounts',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('finance_accounts')
  }
}
