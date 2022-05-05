import { LoginDTO, AccessSessionPayloadModel } from '@/domain/authentication'
import { SettingsModel } from '@/domain/common'

export interface LoginUseCase {
  login: (params: LoginDTO, settings: SettingsModel) => Promise<AccessSessionPayloadModel>
}
