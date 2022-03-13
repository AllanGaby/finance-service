import { EntityModel } from '@/domain/common'
import { ModuleModel, AccessProfileModel, AccountModel } from '@/domain/authentication'

export type AccountAccessModuleModel = EntityModel & {
  account_id: AccountModel
  account: AccountModel
  access_profile_id: string
  access_profile: AccessProfileModel
  module_id: string
  module?: ModuleModel
}
