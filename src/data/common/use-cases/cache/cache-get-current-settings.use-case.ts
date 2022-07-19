import { CustomFilterConditional, CustomFilterOperator, GetCurrentSettingsUseCase, SettingsModel } from '@/domain/common'
import { CreateCacheProtocol, RecoverCacheByKeyProtocol } from '@/protocols/cache'
import { GetOneEntityRepository } from '@/protocols/repositories'
import { EntityIsNotFoundError } from '@/data/common/errors'

export class CacheGetCurrentSettingsUseCase implements GetCurrentSettingsUseCase {
  constructor (
    private readonly recoverSettingsInCacheAdapter: RecoverCacheByKeyProtocol,
    private readonly getSettingsRepository: GetOneEntityRepository<SettingsModel>,
    private readonly setSettingsInCacheAdapter: CreateCacheProtocol
  ) {}

  async getCurrentSettings (): Promise<SettingsModel> {
    let settings = await this.recoverSettingsInCacheAdapter.recover<SettingsModel>('current-settings').catch(_ => {
      throw new EntityIsNotFoundError('Settings')
    })
    if (!settings) {
      settings = await this.getSettingsRepository.getOne([{
        field: 'version',
        conditional: CustomFilterConditional.isEmpty,
        operator: CustomFilterOperator.and,
        value: undefined
      }])
      if (settings) {
        await this.setSettingsInCacheAdapter.create<SettingsModel>({
          key: 'current-settings',
          record: settings
        }).catch(_ => {
          throw new EntityIsNotFoundError('Settings')
        })
      }
    }
    return settings
  }
}
