import { EntityModel } from '@/domain/common'
import { AccountModel } from '@/domain/authentication'
import { FinanceTransactionModel } from '@/domain/finance'

export type TransactionTagModel = EntityModel & {
  account_id: string
  name: string
  account?: AccountModel
  finance_transactions?: FinanceTransactionModel[]
}
