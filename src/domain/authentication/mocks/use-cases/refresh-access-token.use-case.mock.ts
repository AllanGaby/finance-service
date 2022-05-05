import { RefreshAccessTokenUseCase, RefreshAccessTokenDTO, AccessSessionPayloadModel, mockAccessSessionPayloadModel } from '@/domain/authentication'
import { SettingsModel } from '@/domain/common'

export class RefreshAccessTokenUseCaseSpy implements RefreshAccessTokenUseCase {
  params: RefreshAccessTokenDTO
  accessSession: AccessSessionPayloadModel = mockAccessSessionPayloadModel()
  settings: SettingsModel

  async refresh (params: RefreshAccessTokenDTO, settings: SettingsModel): Promise<AccessSessionPayloadModel> {
    this.params = params
    this.settings = settings
    return this.accessSession
  }
}
