import { UpdateEntityByIdUseCase, SettingsModel } from '@/domain/common'
import { DbUpdateSettingsByIdUseCase } from '@/data/common/use-cases'
import { CacheFactory, CacheConfigurationModel } from '@/infrastructure/cache'
import { SettingsEntity } from '@/infrastructure/common'
import { CreateNewEntityVersionUseCaseProps, makeCreateNewEntityVersionUseCase } from '@/main/factories/common/use-cases'

export type UpdateSettingsByIdUseCaseProps =
CreateNewEntityVersionUseCaseProps &
CacheConfigurationModel

export const makeUpdateSettingsByIdUseCase = (
  props: UpdateSettingsByIdUseCaseProps
): UpdateEntityByIdUseCase<SettingsModel> =>
  new DbUpdateSettingsByIdUseCase(
    makeCreateNewEntityVersionUseCase(props, SettingsEntity),
    CacheFactory.getCacheAdapter(props),
    CacheFactory.getCacheAdapter(props)
  )
