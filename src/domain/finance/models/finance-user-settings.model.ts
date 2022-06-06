import { EntityModel } from '@/domain/common'
import { AccountModel } from '@/domain/authentication'

export type FinanceUserSettingsModel = EntityModel & {
  account_id: string
  months_to_predict: number
  account?: AccountModel
}
