import { mockEntityModel } from '@/domain/common'
import { ModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockModuleModel = (): ModuleModel => ({
  ...mockEntityModel(),
  name: datatype.string(),
  description: datatype.string(),
  module_key: datatype.uuid(),
  enabled: datatype.boolean(),
  access_rules: []
})
