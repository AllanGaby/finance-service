import { CreateEntityDTO, CreateEntityUseCase, EntityModel } from '@/domain/common'
import { DbCreateEntityUseCase } from '@/data/common/use-cases'
import { CreateEntityRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { EntityTarget } from 'typeorm'

export type CreateEntityUseCaseProps = CommonUseCaseProps

export const makeCreateEntityUseCase = <EntityType extends EntityModel, DTOType = CreateEntityDTO<EntityType>>(
  props: CreateEntityUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  CreateEntityUseCase<EntityType, DTOType> =>
    new DbCreateEntityUseCase<EntityType, DTOType>(
      CommonRepositoryFactory.getRepository<EntityType, CreateEntityRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings)
    )
