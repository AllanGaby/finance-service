import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addInvoicesFkToTransactionPaymentMigration1653911539203 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('invoices',
      new TableForeignKey({
        name: 'invoices_fk03',
        columnNames: ['finance_transaction_payment_id'],
        referencedTableName: 'finance_transactions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('invoices',
      new TableForeignKey({
        name: 'invoices_fk03',
        columnNames: ['finance_transaction_payment_id'],
        referencedTableName: 'finance_transactions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }))
  }
}
