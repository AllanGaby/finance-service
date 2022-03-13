import { GetEntityByIdUseCase, EntityModel } from '@/domain/common'
import { DbGetEntityByIdUseCase } from '@/data/common/use-cases'
import { GetEntityByIdRepository } from '@/protocols/repositories'
import { CommonRepositoryFactory } from '@/infrastructure/repositories'
import { CommonUseCaseProps } from '@/infrastructure/common/use-cases'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdUseCaseProps = CommonUseCaseProps & {
  entityName: string
}

export const makeGetEntityByIdUseCase = <EntityType extends EntityModel>(
  props: GetEntityByIdUseCaseProps,
  entityClass: EntityTarget<EntityType>
):
  GetEntityByIdUseCase<EntityType> =>
    new DbGetEntityByIdUseCase<EntityType>(
      CommonRepositoryFactory.getRepository<EntityType, GetEntityByIdRepository<EntityType>>(props.repositoryType, entityClass, props.repositorySettings),
      props.entityName
    )
