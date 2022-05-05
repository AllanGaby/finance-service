import { AccessSessionPayloadModel, RefreshAccessTokenDTO } from '@/domain/authentication'
import { SettingsModel } from '@/domain/common'

export interface RefreshAccessTokenUseCase {
  refresh: (params: RefreshAccessTokenDTO, settings: SettingsModel) => Promise<AccessSessionPayloadModel>
}
