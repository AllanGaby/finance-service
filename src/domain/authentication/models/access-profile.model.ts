import { EntityModel } from '@/domain/common'
import { ModuleModel } from '@/domain/authentication'

export type AccessProfileModel = EntityModel & {
  name: string
  enabled: boolean
  access_profile_key: string
  module_id: string
  module?: ModuleModel
}
