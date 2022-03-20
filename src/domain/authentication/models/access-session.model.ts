import { EntityModel } from '@/domain/common'
import { AccountModel, AccessSessionModuleModel } from '@/domain/authentication'

export type AccessSessionModel = EntityModel & {
  account_id: string
  account?: AccountModel
  access_session_modules: string
  modules?: AccessSessionModuleModel
  deleted_at?: Date
}
