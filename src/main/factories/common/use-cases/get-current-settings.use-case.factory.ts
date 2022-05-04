import { GetCurrentSettingsUseCase } from '@/domain/common'
import { CacheGetCurrentSettingsUseCase } from '@/data/common/use-cases'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'

export type GetCurrentSettingsUseCaseProps = CacheConfigurationModel

export const makeGetCurrentSettingsUseCase = (
  props: GetCurrentSettingsUseCaseProps
):
GetCurrentSettingsUseCase =>
  new CacheGetCurrentSettingsUseCase(
    CacheFactory.getCacheAdapter(props)
  )
