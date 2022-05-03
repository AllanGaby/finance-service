import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { ListEntitiesAndExportToFileControllerProps, makeListEntitiesAndExportToFileController } from '@/main/factories/common/controllers'
import { makeCommonColumnsFieldsValidations } from '@/main/factories/common/fields-validations'
import { makeCommonFieldValidationMiddleware, makeCustomFiltersMapperMiddleware, makeListOrdersMapperMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationType } from '@/protocols/http'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesAndExportToXLSXFileWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesAndExportToFileControllerProps

export const makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: ListEntitiesAndExportToXLSXFileWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  listAccessRules: string[],
  validRepositoryColumns: string[] = [],
  validRequestColumns: string[] = [],
  validRepositoryOrders: string[] = []
): Router =>
    Router()
      .get('/xlsx/:columns',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
        ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
          validRepositoryOrders,
          validRequestColumns
        })),
        ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
          validRepositoryColumns,
          validRequestColumns
        })),
        ExpressControllerAdapter(makeListEntitiesAndExportToFileController<EntityType>(props, entityClass)))
