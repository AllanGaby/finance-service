import 'module-alias/register'
import { InvoiceModel, InvoiceStatus } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { FinanceAccountEntity, FinanceTransactionEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'

@Entity('invoices')
export class InvoiceEntity extends DefaultEntity implements InvoiceModel {
  @Column()
  finance_account_id: string

  @Column()
  finance_account_for_payment_id: string

  @Column()
  start_date: Date

  @Column()
  final_date: Date

  @Column()
  due_date: Date

  @Column()
  start_date_str: string

  @Column()
  final_date_str: string

  @Column()
  due_date_str: string

  @Column()
  finance_transaction_payment_id: string

  @Column()
  value: number

  @Column()
  value_predict: number

  @Column()
  payment_value?: number

  @Column()
  status: InvoiceStatus

  @Column()
  value_installments: number

  @OneToOne(() => FinanceAccountEntity)
  @JoinColumn({
    name: 'finance_account_id'
  })
  finance_account?: FinanceAccountEntity

  @OneToOne(() => FinanceTransactionEntity)
  @JoinColumn({
    name: 'finance_transaction_payment_id'
  })
  finance_transaction_payment?: FinanceTransactionEntity

  @OneToOne(() => FinanceAccountEntity)
  @JoinColumn({
    name: 'finance_account_for_payment_id'
  })
  finance_account_for_payment?: FinanceAccountEntity

  @OneToMany(() => FinanceTransactionEntity, financeTransaction => financeTransaction.invoice)
  finance_translactions?: FinanceTransactionEntity[]
}
