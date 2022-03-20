import { AccessSessionModuleModel } from '@/domain/authentication'

export type AccessSessionPayloadModel = {
  account_id: string
  session_id: string
  account_name: string
  modules: AccessSessionModuleModel
  access_token: string
  refresh_token: string
}
