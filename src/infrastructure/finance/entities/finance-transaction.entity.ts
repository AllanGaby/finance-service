import 'module-alias/register'
import { FinanceTransactionModel, FinanceTransctionType } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { CompanyEntity, InvoiceEntity, FinanceAccountEntity, TransactionCategoryEntity, TransactionTagEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'

@Entity('finance_transactions')
export class FinanceTransactionEntity extends DefaultEntity implements FinanceTransactionModel {
  @Column()
  title: string

  @Column()
  type: FinanceTransctionType

  @Column()
  date: Date

  @Column()
  date_str: string

  @Column()
  value: number

  @Column()
  finance_account_id: string

  @Column()
  transaction_category_id: string

  @Column()
  invoice_id?: string

  @Column()
  company_id?: string

  @Column()
  original_finance_transaction_id?: string

  @Column()
  current_portion?: number

  @Column()
  first_portion?: number

  @Column()
  last_portion?: number

  @OneToOne(() => FinanceAccountEntity)
  @JoinColumn({
    name: 'finance_account_id'
  })
  finance_account?: FinanceAccountEntity

  @OneToOne(() => TransactionCategoryEntity)
  @JoinColumn({
    name: 'transaction_category_id'
  })
  transaction_category?: TransactionCategoryEntity

  @OneToOne(() => InvoiceEntity)
  @JoinColumn({
    name: 'invoice_id'
  })
  invoice?: InvoiceEntity

  @OneToOne(() => CompanyEntity)
  @JoinColumn({
    name: 'company_id'
  })
  company?: CompanyEntity

  @OneToOne(() => FinanceTransactionEntity)
  @JoinColumn({
    name: 'original_finance_transaction_id'
  })
  original_finance_transaction?: FinanceTransactionEntity

  @OneToMany(() => FinanceTransactionEntity, financeTransaction => financeTransaction.original_finance_transaction)
  finance_transactions?: FinanceTransactionEntity[]

  @ManyToMany(() => TransactionTagEntity)
  @JoinTable({
    name: 'finance_transaction_tags',
    inverseJoinColumn: {
      name: 'transaction_tag_id',
      referencedColumnName: 'id'
    },
    joinColumn: {
      name: 'finance_transaction_id',
      referencedColumnName: 'id'
    }
  })
  transaction_tags?: TransactionTagEntity[]
}
