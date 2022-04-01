import { CreateEntityDTO, CreateNewEntityVersionUseCase, VersionedEntityModel } from '@/domain/common'
import { DbCreateNewEntityVersionUseCase } from '@/data/common/use-cases'
import { CreateEntityRepository, GetOneEntityRepository, SoftDeleteEntityRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common'
import { EntityTarget } from 'typeorm'

export type CreateNewEntityVersionUseCaseProps =
CommonUseCaseProps & {
  entityName: string
}

export const makeCreateNewEntityVersionUseCase = <EntityType extends VersionedEntityModel, DTOType = CreateEntityDTO<EntityType>>(
  props: CreateNewEntityVersionUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  CreateNewEntityVersionUseCase<EntityType, DTOType> =>
    new DbCreateNewEntityVersionUseCase<EntityType, DTOType>(
      CommonRepositoryFactory.getRepository<EntityType, GetOneEntityRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      props.entityName,
      CommonRepositoryFactory.getRepository<EntityType, SoftDeleteEntityRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      CommonRepositoryFactory.getRepository<EntityType, CreateEntityRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings)
    )
