import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { FieldValidationType } from '@/protocols/http'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesAndExportToFileController } from '@/presentation/common'
import { ListEntitiesAndExportToFileControllerProps, makeListEntitiesAndExportToFileController } from '@/main/factories/common/controllers'
import {
  makeCustomFiltersMapperMiddleware,
  makeListOrdersMapperMiddleware,
  makeCommonFieldValidationMiddleware,
  makeCheckBusinessRuleMiddleware
} from '@/main/factories/common/middlewares'
import { makeCommonColumnsFieldsValidations } from '@/main/factories/common/fields-validations'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesAndExportToXLSXFileWithAuthenticationRouteProps =
        RecoverAccessSessionMiddlewareProps &
        ListEntitiesAndExportToFileControllerProps

export const makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: ListEntitiesAndExportToXLSXFileWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  listAccessRules: string[],
  validRepositoryColumns: string[],
  validRequestColumns: string[],
  validRepositoryOrders: string[],
  listEntitiesAndExportToFileController?: ListEntitiesAndExportToFileController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!listEntitiesAndExportToFileController) {
    listEntitiesAndExportToFileController = makeListEntitiesAndExportToFileController<EntityType>(props, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .get('/xlsx/:columns',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
        ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
          validRepositoryOrders: validRepositoryOrders,
          validRequestColumns: validRequestColumns
        })),
        ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
          validRepositoryColumns: validRepositoryColumns,
          validRequestColumns: validRequestColumns
        })),
        ExpressControllerAdapter(listEntitiesAndExportToFileController))
  }
  return Router()
    .get('/xlsx/:columns',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
      ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
        validRepositoryOrders: validRepositoryOrders,
        validRequestColumns: validRequestColumns
      })),
      ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
        validRepositoryColumns: validRepositoryColumns,
        validRequestColumns: validRequestColumns
      })),
      ExpressControllerAdapter(listEntitiesAndExportToFileController))
}
