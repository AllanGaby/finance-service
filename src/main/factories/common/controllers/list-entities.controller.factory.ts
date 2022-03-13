import { EntityModel } from '@/domain/common'
import { ListEntitiesController } from '@/presentation/common/controllers'
import { makeGetCustomFilterUseCase, ListEntitiesUseCaseProps, makeListEntitiesUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesControllerProps = ListEntitiesUseCaseProps

export const makeListEntitiesController = <EntityType extends EntityModel>(
  props: ListEntitiesControllerProps,
  entityClass: EntityTarget<EntityType>
): ListEntitiesController<EntityType> =>
    new ListEntitiesController(
      makeGetCustomFilterUseCase({
        validParamsColumns: [],
        validRepositoryColumns: []
      }),
      makeListEntitiesUseCase<EntityType>(props, entityClass)
    )
