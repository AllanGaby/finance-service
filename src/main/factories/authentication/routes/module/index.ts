import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleModel,
  RepositoryModuleFilter,
  RequestModuleFilter,
  ModuleColumnsToExportXLSX,
  RequestModuleOrder
} from '@/domain/authentication'
import {
  ModuleEntity,
  ModuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes,
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeCreateModuleFieldsValidations, makeUpdateModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeModuleRoute = (props: ModuleRouteProps): Router => {
  props.repositorySettings = ModuleRepositorySettings

  return Router()
    .use('/module', makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName: 'Module',
      validColumnsToExport: ModuleColumnsToExportXLSX
    },
    ModuleEntity,
    [AuthenticationAccessRules.ListModules],
    Object.values(RepositoryModuleFilter),
    Object.values(RequestModuleFilter),
    Object.values(RequestModuleOrder)
    ))
    .use('/module',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleModel>(props, {
        validRepositoryColumns: Object.values(RepositoryModuleFilter),
        validRequestColumns: Object.values(RequestModuleFilter),
        validRepositoryOrders: Object.values(RequestModuleOrder),
        entityClass: ModuleEntity,
        paramIdName: 'module_id',
        entityName: 'Module',
        createFieldsValidation: makeCreateModuleFieldsValidations(),
        updateFieldsValidation: makeUpdateModuleFieldsValidations(),
        createAccessRules: [AuthenticationAccessRules.CreateModules],
        updateAccessRules: [AuthenticationAccessRules.UpdateModules],
        deleteAccessRules: [AuthenticationAccessRules.DeleteModules],
        getByIdAccessRules: [AuthenticationAccessRules.ShowModules],
        listAccessRules: [AuthenticationAccessRules.ListModules]
      })
    )
}
