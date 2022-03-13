import { EntityModel, ListEntitiesUseCase } from '@/domain/common'
import { DbListEntitiesUseCase } from '@/data/common/use-cases'
import { CountEntitiesRepository, ListEntitiesRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesUseCaseProps = CommonUseCaseProps

export const makeListEntitiesUseCase = <EntityType extends EntityModel>(
  props: ListEntitiesUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  ListEntitiesUseCase<EntityType> =>
    new DbListEntitiesUseCase<EntityType>(
      CommonRepositoryFactory.getRepository<EntityType, CountEntitiesRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      CommonRepositoryFactory.getRepository<EntityType, ListEntitiesRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings)
    )
