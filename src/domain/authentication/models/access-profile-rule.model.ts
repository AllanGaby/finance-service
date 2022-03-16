import { EntityModel } from '@/domain/common'
import { ModuleAccessRuleModel, AccessProfileModel } from '@/domain/authentication'

export type AccessProfileRuleModel = EntityModel & {
  access_profile_id: string
  access_profile?: AccessProfileModel
  module_access_rule_id: string
  module_access_rule?: ModuleAccessRuleModel
}
