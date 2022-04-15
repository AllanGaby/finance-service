import { AuthenticationAccessRules } from '@/domain/authentication'
import { FieldValidationType } from '@/protocols/http'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ModuleEntity } from '@/infrastructure/authentication'
import { ListEntitiesAndExportToFileControllerProps, makeListEntitiesAndExportToFileController } from '@/main/factories/common/controllers'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { makeCommonColumnsFieldsValidations } from '@/main/factories/common/fields-validations'
import { makeCommonFieldValidationMiddleware, makeMapperCustomFiltersMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'

export type ListModulesAndExportToXLSXFileRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesAndExportToFileControllerProps

export const makeListModulesAndExportToXLSXFileRoute = (
  props: ListModulesAndExportToXLSXFileRouteProps,
  validRepositoryColumns: string[],
  validRequestColumns: string[]
): Router =>
  Router()
    .get('/xlsx/:columns',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, [AuthenticationAccessRules.ListModules])),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(makeCommonColumnsFieldsValidations(), FieldValidationType.Params)),
      ExpressMiddlewareAdapter(makeMapperCustomFiltersMiddleware({
        validRepositoryColumns,
        validRequestColumns
      })),
      ExpressControllerAdapter(makeListEntitiesAndExportToFileController(props, ModuleEntity)))
