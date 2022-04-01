import { AccountModel } from '@/domain/authentication'
import { EntityModel } from '@/domain/common'

export type RequestRecoverPasswordModel = EntityModel & {
  authentication_secret: string
  validation_code: string
  deleted_at?: Date
  account_id: string
  account?: AccountModel
}
