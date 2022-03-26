import { RefreshAccessProfileRulesUseCase } from '@/domain/authentication'
import { DbRefreshAccessProfileRulesUseCase } from '@/data/authentication/use-cases'
import {
  ListEntitiesRepository,
  DeleteEntitiesByListIdRepository,
  CreateEntityInBulkRepository
} from '@/protocols/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { AccessProfileRuleEntity, AccessProfileRuleRepositorySettings } from '@/infrastructure/authentication'

export type RefreshAccessProfileUseCaseProps =
CommonUseCaseProps

export const makeRefreshAccessProfileAccessRulesUseCase = (props: RefreshAccessProfileUseCaseProps): RefreshAccessProfileRulesUseCase =>
  new DbRefreshAccessProfileRulesUseCase(
    CommonRepositoryFactory.getRepository<AccessProfileRuleEntity, ListEntitiesRepository<AccessProfileRuleEntity>>(props.repositoryType, AccessProfileRuleEntity, AccessProfileRuleRepositorySettings),
    CommonRepositoryFactory.getRepository<AccessProfileRuleEntity, DeleteEntitiesByListIdRepository<AccessProfileRuleEntity>>(props.repositoryType, AccessProfileRuleEntity),
    CommonRepositoryFactory.getRepository<AccessProfileRuleEntity, CreateEntityInBulkRepository<AccessProfileRuleEntity>>(props.repositoryType, AccessProfileRuleEntity)
  )
