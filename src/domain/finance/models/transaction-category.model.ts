import { EntityModel } from '@/domain/common'
import { AccountModel } from '@/domain/authentication'

export type TransactionCategoryModel = EntityModel & {
  account_id: string
  name: string
  credit: boolean
  debit: boolean
  account?: AccountModel
}
