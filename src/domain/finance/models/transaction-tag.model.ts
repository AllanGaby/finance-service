import { EntityModel } from '@/domain/common'
import { AccountModel } from '@/domain/authentication'

export type TransactionTagModel = EntityModel & {
  account_id: string
  name: string
  account?: AccountModel
}
