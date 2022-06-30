import { EntityModel } from '@/domain/common'
import { FinanceAccountModel, FinanceTransctionType, InvoiceModel, CompanyModel, TransactionCategoryModel, TransactionTagModel } from '@/domain/finance'

export type FinanceTransactionModel = EntityModel & {
  title: string
  type: FinanceTransctionType
  date: Date
  date_str: string
  value: number
  current_portion?: number
  first_portion?: number
  last_portion?: number
  finance_account_id: string
  transaction_category_id: string
  invoice_id?: string
  company_id?: string
  original_finance_transaction_id?: string
  transaction_category?: TransactionCategoryModel
  finance_account?: FinanceAccountModel
  invoice?: InvoiceModel
  company?: CompanyModel
  original_finance_transaction?: FinanceTransactionModel
  finance_transactions?: FinanceTransactionModel[]
  transaction_tags?: TransactionTagModel[]
}
