import { EntityModel } from '@/domain/common'
import { ListEntitiesController } from '@/presentation/common'
import { ListEntitiesUseCaseProps, makeListEntitiesUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesControllerProps =
ListEntitiesUseCaseProps & {
  accountIdField?: string
}

export const makeListEntitiesController = <EntityType extends EntityModel>(
  props: ListEntitiesControllerProps,
  entityClass: EntityTarget<EntityType>
): ListEntitiesController<EntityType> =>
    new ListEntitiesController(
      makeListEntitiesUseCase<EntityType>(props, entityClass),
      props.accountIdField
    )
