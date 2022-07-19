import { GetCurrentSettingsUseCase } from '@/domain/common'
import { CacheGetCurrentSettingsUseCase } from '@/data/common/use-cases'
import { GetOneEntityRepository } from '@/protocols/repositories'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { SettingsEntity, CommonUseCaseProps } from '@/infrastructure/common'

export type GetCurrentSettingsUseCaseProps = CommonUseCaseProps & CacheConfigurationModel

export const makeGetCurrentSettingsUseCase = (
  props: GetCurrentSettingsUseCaseProps
):
GetCurrentSettingsUseCase =>
  new CacheGetCurrentSettingsUseCase(
    CacheFactory.getCacheAdapter(props),
    CommonRepositoryFactory.getRepository<SettingsEntity, GetOneEntityRepository<SettingsEntity>>(props.repositoryType, SettingsEntity),
    CacheFactory.getCacheAdapter(props)
  )
