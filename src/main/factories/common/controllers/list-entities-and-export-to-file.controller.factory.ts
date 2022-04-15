import { EntityModel } from '@/domain/common'
import { ListEntitiesAndExportToFileController } from '@/presentation/common'
import { ListEntitiesAndExportToFileUseCaseProps, makeListEntitiesAndExportToFileUseCase } from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesAndExportToFileControllerProps =
ListEntitiesAndExportToFileUseCaseProps

export const makeListEntitiesAndExportToFileController = <EntityType extends EntityModel>(
  props: ListEntitiesAndExportToFileControllerProps,
  entityClass: EntityTarget<EntityType>
): ListEntitiesAndExportToFileController<EntityType> =>
    new ListEntitiesAndExportToFileController(
      makeListEntitiesAndExportToFileUseCase<EntityType>(props, entityClass)
    )
