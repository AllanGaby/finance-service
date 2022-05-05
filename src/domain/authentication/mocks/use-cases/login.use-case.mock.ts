import { LoginUseCase, LoginDTO, AccessSessionPayloadModel, mockAccessSessionPayloadModel } from '@/domain/authentication'
import { SettingsModel } from '@/domain/common'

export class LoginUseCaseSpy implements LoginUseCase {
  params: LoginDTO
  accessSession: AccessSessionPayloadModel = mockAccessSessionPayloadModel()
  settings: SettingsModel

  async login (params: LoginDTO, settings: SettingsModel): Promise<AccessSessionPayloadModel> {
    this.params = params
    this.settings = settings
    return this.accessSession
  }
}
