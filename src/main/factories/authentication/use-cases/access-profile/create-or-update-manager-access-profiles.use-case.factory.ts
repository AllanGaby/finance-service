import { CreateOrUpdateManagerAccessProfilesUseCase } from '@/domain/authentication'
import { DbCreateOrUpdateManagerAccessProfilesUseCase } from '@/data/authentication/use-cases'
import { ListEntitiesRepository, GetOneEntityRepository } from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import {
  ModuleEntity,
  AccessProfileEntity,
  ModuleRepositorySettings,
  AccessProfileRepositorySettings
} from '@/infrastructure/authentication'
import {
  CreateAccessProfileUseCaseProps,
  UpdateAccessProfileByIdUseCaseProps,
  makeCreateAccessProfileUseCase,
  makeUpdateAccessProfileByIdUseCase
} from '@/main/factories/authentication/use-cases'

export type CreateOrUpdateManagerAccessProfilesUseCaseProps =
CommonUseCaseProps &
CreateAccessProfileUseCaseProps &
UpdateAccessProfileByIdUseCaseProps

export const makeCreateOrUpdateManagerAccessProfilesUseCase = (props: CreateOrUpdateManagerAccessProfilesUseCaseProps): CreateOrUpdateManagerAccessProfilesUseCase =>
  new DbCreateOrUpdateManagerAccessProfilesUseCase(
    CommonRepositoryFactory.getRepository<ModuleEntity, ListEntitiesRepository<ModuleEntity>>(props.repositoryType, ModuleEntity, ModuleRepositorySettings),
    CommonRepositoryFactory.getRepository<AccessProfileEntity, GetOneEntityRepository<AccessProfileEntity>>(props.repositoryType, AccessProfileEntity, AccessProfileRepositorySettings),
    makeCreateAccessProfileUseCase(props),
    makeUpdateAccessProfileByIdUseCase(props)
  )
