import { UpdateEntityDTO, UpdateEntityByIdUseCase, EntityModel } from '@/domain/common'
import { DbUpdateEntityByIdUseCase } from '@/data/common/use-cases'
import { UpdateEntityRepository, GetEntityByIdRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common/use-cases'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdUseCaseProps = CommonUseCaseProps & {
  entityName: string
}

export const makeUpdateEntityByIdUseCase = <EntityType extends EntityModel, DTOType = UpdateEntityDTO<EntityType>>(
  props: UpdateEntityByIdUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  UpdateEntityByIdUseCase<EntityType, DTOType> =>
    new DbUpdateEntityByIdUseCase<EntityType, DTOType>(
      CommonRepositoryFactory.getRepository<EntityType, GetEntityByIdRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      CommonRepositoryFactory.getRepository<EntityType, UpdateEntityRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      props.entityName
    )
