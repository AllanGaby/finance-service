import { mockEntityModel } from '@/domain/common'
import { ModuleAccessRuleModel, mockModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockModuleAccessRuleModel = (): ModuleAccessRuleModel => ({
  ...mockEntityModel(),
  title: datatype.string(),
  description: datatype.string(),
  rule_key: datatype.uuid(),
  module_id: datatype.uuid(),
  module: mockModuleModel()
})
