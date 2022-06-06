import { EntityModel } from '@/domain/common'
import { FinanceTransactionModel, TransactionTagModel } from '@/domain/finance'

export type FinanceTransactionTagModel = EntityModel & {
  finance_transaction_id: string
  finance_transaction?: FinanceTransactionModel
  transaction_tag_id: string
  transaction_tag?: TransactionTagModel
}
