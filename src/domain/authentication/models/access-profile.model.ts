import { EntityModel } from '@/domain/common'
import { ModuleModel, ModuleAccessRuleModel } from '@/domain/authentication'

export type AccessProfileModel = EntityModel & {
  name: string
  enabled: boolean
  access_profile_key: string
  module_id: string
  module?: ModuleModel
  module_access_rules?: ModuleAccessRuleModel[]
  module_name?: string
  module_key?: string
  setModuleData?: () => void
}
