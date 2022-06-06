import { EntityModel } from '@/domain/common'
import { AccountModel } from '@/domain/authentication'
import { FinanceAccountType, CompanyModel, InvoiceModel } from '@/domain/finance'

export type FinanceAccountModel = EntityModel & {
  account_id: string
  name: string
  type: FinanceAccountType
  company_id?: string
  closing_date?: Date
  due_date?: Date
  credit_date?: Date
  closing_date_str?: string
  due_date_str?: string
  credit_date_str?: string
  default_credit_value?: number
  default_credit_released?: number
  default_finance_account_for_payment_id?: string
  account?: AccountModel
  company?: CompanyModel
  default_finance_account_for_payment?: FinanceAccountModel
  invoices?: InvoiceModel[]
}
