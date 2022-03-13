import { EntityModel } from '@/domain/common'
import { ModuleModel } from '@/domain/authentication'

export type AccessProfileModel = EntityModel & {
  name: string
  enabled: boolean
  module_id: string
  module?: ModuleModel
}
