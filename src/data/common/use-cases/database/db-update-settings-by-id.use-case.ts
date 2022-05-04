import { SettingsModel, CreateNewEntityVersionUseCase, UpdateEntityByIdUseCase } from '@/domain/common'
import { InvalidateCacheByKeyProtocol, CreateCacheProtocol } from '@/protocols/cache'

export class DbUpdateSettingsByIdUseCase implements UpdateEntityByIdUseCase<SettingsModel> {
  constructor (
    private readonly createNewSettingsVersionUseCase: CreateNewEntityVersionUseCase<SettingsModel>,
    private readonly invalidateCacheByKeyAdapter: InvalidateCacheByKeyProtocol,
    private readonly createCacheAdapter: CreateCacheProtocol
  ) {}

  async updateById (settingsId: string, params: Partial<SettingsModel>): Promise<SettingsModel> {
    const settings = await this.createNewSettingsVersionUseCase.createVersion(settingsId, params)
    await this.invalidateCacheByKeyAdapter.invalidateByKey('current-settings')
    await this.createCacheAdapter.create<SettingsModel>({
      key: 'current-settings',
      record: settings
    })
    return settings
  }
}
