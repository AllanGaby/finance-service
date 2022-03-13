import { EntityModel } from '@/domain/common'
import { ModuleAccessRuleModel } from '@/domain/authentication'

export type ModuleModel = EntityModel & {
  name: string
  description?: string
  module_key: string
  enabled: boolean
  access_rules?: ModuleAccessRuleModel[]
}
