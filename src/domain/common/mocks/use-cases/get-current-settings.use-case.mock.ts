import { GetCurrentSettingsUseCase, SettingsModel, mockSettingsModel } from '@/domain/common'

export class GetCurrentSettingsUseCaseSpy implements GetCurrentSettingsUseCase {
  settings: SettingsModel = mockSettingsModel()

  async getCurrentSettings (): Promise<SettingsModel> {
    return this.settings
  }
}
