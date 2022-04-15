import { EntityModel, ListEntitiesAndExportToFileUseCase } from '@/domain/common'
import { DbListEntitiesAndExportToFileUseCase } from '@/data/common/use-cases'
import {
  ExportEntitiesToXLSXFileUseCaseProps,
  ListEntitiesUseCaseProps,
  makeExportEntitiesToXLSXFileUseCase,
  makeListEntitiesUseCase
} from '@/main/factories/common/use-cases'
import { EntityTarget } from 'typeorm'

export type ListEntitiesAndExportToFileUseCaseProps =
ExportEntitiesToXLSXFileUseCaseProps &
ListEntitiesUseCaseProps

export const makeListEntitiesAndExportToFileUseCase = <EntityType extends EntityModel>(props: ListEntitiesAndExportToFileUseCaseProps, entityClass: EntityTarget<EntityType>): ListEntitiesAndExportToFileUseCase<EntityType> =>
  new DbListEntitiesAndExportToFileUseCase(
    makeExportEntitiesToXLSXFileUseCase(props),
    makeListEntitiesUseCase(props, entityClass)
  )
