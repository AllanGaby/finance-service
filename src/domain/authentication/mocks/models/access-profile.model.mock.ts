import { mockEntityModel } from '@/domain/common'
import { AccessProfileModel, mockModuleModel, mockModuleAccessRuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessProfileModel = (): AccessProfileModel => ({
  ...mockEntityModel(),
  name: datatype.string(),
  enabled: datatype.boolean(),
  access_profile_key: datatype.uuid(),
  module_id: datatype.uuid(),
  module: mockModuleModel(),
  module_access_rules: [
    mockModuleAccessRuleModel(),
    mockModuleAccessRuleModel(),
    mockModuleAccessRuleModel(),
    mockModuleAccessRuleModel(),
    mockModuleAccessRuleModel(),
    mockModuleAccessRuleModel()
  ]
})
