import { GetCurrentSettingsUseCase, SettingsModel } from '@/domain/common'
import { DbGetCurrentSettingsUseCase } from '@/data/common/use-cases'
import { GetOneEntityRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps, SettingsEntity } from '@/infrastructure/common'

export type GetCurrentSettingsUseCaseProps = CommonUseCaseProps

export const makeGetCurrentSettingsUseCase = (
  props: GetCurrentSettingsUseCaseProps
):
GetCurrentSettingsUseCase =>
  new DbGetCurrentSettingsUseCase(
    CommonRepositoryFactory.getRepository<SettingsModel, GetOneEntityRepository<SettingsModel>>(props.repositoryType, SettingsEntity)
  )
