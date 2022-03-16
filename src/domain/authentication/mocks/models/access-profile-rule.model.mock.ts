import { mockEntityModel } from '@/domain/common'
import { AccessProfileRuleModel, mockModuleAccessRuleModel, mockAccessProfileModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessProfileRuleModel = (): AccessProfileRuleModel => ({
  ...mockEntityModel(),
  access_profile_id: datatype.uuid(),
  access_profile: mockAccessProfileModel(),
  module_access_rule_id: datatype.uuid(),
  module_access_rule: mockModuleAccessRuleModel()
})
