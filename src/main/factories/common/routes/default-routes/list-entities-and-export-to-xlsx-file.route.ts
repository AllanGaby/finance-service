import { EntityModel } from '@/domain/common'
import { FieldValidationType } from '@/protocols/http'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesAndExportToFileControllerProps, makeListEntitiesAndExportToFileController } from '@/main/factories/common/controllers'
import { makeCustomFiltersMapperMiddleware, makeListOrdersMapperMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { makeCommonColumnsFieldsValidations } from '@/main/factories/common/fields-validations'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesAndExportToXLSXFileRouteProps =
ListEntitiesAndExportToFileControllerProps & {
  validRepositoryColumns: string[]
  validRequestColumns: string[]
  validRepositoryOrders: string[]
}

export const makeListEntitiesAndExportToXLSXFileRoute = <EntityType extends EntityModel>(
  props: ListEntitiesAndExportToXLSXFileRouteProps,
  entityClass: EntityTarget<EntityType>
): Router =>
    Router()
      .get('/xlsx/:columns',
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
        ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
          validRepositoryOrders: props.validRepositoryOrders,
          validRequestColumns: props.validRequestColumns
        })),
        ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
          validRepositoryColumns: props.validRepositoryColumns,
          validRequestColumns: props.validRequestColumns
        })),
        ExpressControllerAdapter(makeListEntitiesAndExportToFileController<EntityType>(props, entityClass)))
