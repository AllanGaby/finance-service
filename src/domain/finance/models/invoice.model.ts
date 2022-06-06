import { EntityModel } from '@/domain/common'
import { InvoiceStatus, FinanceAccountModel, FinanceTransactionModel } from '@/domain/finance'

export type InvoiceModel = EntityModel & {
  finance_account_id: string
  finance_account_for_payment_id: string
  finance_transaction_payment_id: string
  start_date: Date
  final_date: Date
  due_date: Date
  start_date_str: string
  final_date_str: string
  due_date_str: string
  value: number
  value_predict: number
  payment_value?: number
  status: InvoiceStatus
  value_installments: number
  finance_account?: FinanceAccountModel
  finance_account_for_payment?: FinanceAccountModel
  finance_transaction_payment?: FinanceTransactionModel
  finance_translactions?: FinanceTransactionModel[]
}
