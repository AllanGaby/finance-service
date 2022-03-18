import { DeleteEntityByIdUseCase, EntityModel } from '@/domain/common'
import { DbDeleteEntityByIdUseCase } from '@/data/common/use-cases'
import { DeleteEntityByIdRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdUseCaseProps = CommonUseCaseProps

export const makeDeleteEntityByIdUseCase = <EntityType extends EntityModel>(
  props: DeleteEntityByIdUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  DeleteEntityByIdUseCase<EntityType> =>
    new DbDeleteEntityByIdUseCase<EntityType>(
      CommonRepositoryFactory.getRepository<EntityType, DeleteEntityByIdRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings)
    )
