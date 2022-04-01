import { SettingsModel } from '@/domain/common'

export interface GetCurrentSettingsUseCase {
  getCurrentSettings: () => Promise<SettingsModel>
}
