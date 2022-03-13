import { EntityModel } from '@/domain/common'
import { ModuleModel } from '@/domain/authentication'

export type ModuleAccessRuleModel = EntityModel & {
  title: string
  description?: string
  rule_key: string
  module_id: string
  module?: ModuleModel
}
