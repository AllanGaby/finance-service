import 'module-alias/register'
import { FinanceAccountType, FinanceAccountModel } from '@/domain/finance'
import { DefaultEntity } from '@/infrastructure/repositories'
import { AccountEntity } from '@/infrastructure/authentication'
import { CompanyEntity, InvoiceEntity } from '@/infrastructure/finance'
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity('finance_accounts')
export class FinanceAccountEntity extends DefaultEntity implements FinanceAccountModel {
  @Column()
  account_id: string

  @Column()
  name: string

  @Column()
  type: FinanceAccountType

  @Column()
  company_id?: string

  @Column()
  closing_date?: Date

  @Column()
  due_date?: Date

  @Column()
  credit_date?: Date

  @Column()
  closing_date_str?: string

  @Column()
  due_date_str?: string

  @Column()
  credit_date_str?: string

  @Column()
  default_credit_value?: number

  @Column()
  default_credit_released?: number

  @Column()
  default_finance_account_for_payment_id?: string

  @OneToOne(() => AccountEntity)
  @JoinColumn({
    name: 'account_id'
  })
  account?: AccountEntity

  @OneToOne(() => CompanyEntity)
  @JoinColumn({
    name: 'company_id'
  })
  company?: CompanyEntity

  @OneToOne(() => FinanceAccountEntity)
  @JoinColumn({
    name: 'default_finance_account_for_payment_id'
  })
  default_finance_account_for_payment?: FinanceAccountEntity

  @OneToMany(() => InvoiceEntity, invoice => invoice.finance_account)
  invoices?: InvoiceEntity[]
}
