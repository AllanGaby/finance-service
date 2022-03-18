import { EntityModel } from '@/domain/common'
import { ListEntitiesController } from '@/presentation/common/controllers'
import { makeMapperCustomFilterUseCase, ListEntitiesUseCaseProps, makeListEntitiesUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesControllerProps =
ListEntitiesUseCaseProps &
{
  validRequestColumns?: string[]
  validRepositoryColumns?: string[]
}

export const makeListEntitiesController = <EntityType extends EntityModel>(
  props: ListEntitiesControllerProps,
  entityClass: EntityTarget<EntityType>
): ListEntitiesController<EntityType> =>
    new ListEntitiesController(
      makeMapperCustomFilterUseCase({
        validRequestColumns: props.validRequestColumns || [],
        validRepositoryColumns: props.validRepositoryColumns || []
      }),
      makeListEntitiesUseCase<EntityType>(props, entityClass)
    )
