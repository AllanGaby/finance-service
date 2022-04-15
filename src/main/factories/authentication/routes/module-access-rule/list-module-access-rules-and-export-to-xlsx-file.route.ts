import { AuthenticationAccessRules } from '@/domain/authentication'
import { FieldValidationType } from '@/protocols/http'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ModuleAccessRuleEntity } from '@/infrastructure/authentication'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { ListEntitiesAndExportToFileControllerProps, makeListEntitiesAndExportToFileController } from '@/main/factories/common/controllers'
import { makeCommonColumnsFieldsValidations } from '@/main/factories/common/fields-validations'
import { makeCommonFieldValidationMiddleware, makeMapperCustomFiltersMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'

export type ListModuleAccessRulesAndExportToXLSXFileRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesAndExportToFileControllerProps

export const makeListModuleAccessRulesAndExportToXLSXFileRoute = (
  props: ListModuleAccessRulesAndExportToXLSXFileRouteProps,
  validRepositoryColumns: string[],
  validRequestColumns: string[]
): Router =>
  Router()
    .get('/xlsx/:columns',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, [AuthenticationAccessRules.ListModuleAccessRules])),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
      ExpressMiddlewareAdapter(makeMapperCustomFiltersMiddleware({
        validRepositoryColumns,
        validRequestColumns
      })),
      ExpressControllerAdapter(makeListEntitiesAndExportToFileController(props, ModuleAccessRuleEntity)))
