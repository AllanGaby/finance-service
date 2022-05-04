import { GetCurrentSettingsUseCase, SettingsModel } from '@/domain/common'
import { RecoverCacheByKeyProtocol } from '@/protocols/cache'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class CacheGetCurrentSettingsUseCase implements GetCurrentSettingsUseCase {
  constructor (
    private readonly recoverSettingsInCacheAdapter: RecoverCacheByKeyProtocol
  ) {}

  async getCurrentSettings (): Promise<SettingsModel> {
    return this.recoverSettingsInCacheAdapter.recover<SettingsModel>('current-settings').catch(_ => {
      throw new EntityIsNotFoundError('Settings')
    })
  }
}
