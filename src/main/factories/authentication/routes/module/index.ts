import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleModel,
  RepositoryModuleFilter,
  RequestModuleFilter,
  ModuleColumnsToExportXLSX
} from '@/domain/authentication'
import {
  ModuleEntity,
  ModuleRepositorySettings
} from '@/infrastructure/authentication'
import { makeListModulesAndExportToXLSXFileRoute } from './list-modules-and-export-to-xlsx-file.route'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateModuleFieldsValidations, makeUpdateModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeModuleRoute = (props: ModuleRouteProps): Router => {
  props.repositorySettings = ModuleRepositorySettings
  return Router()
    .use('/module', makeListModulesAndExportToXLSXFileRoute({
      ...props,
      entityName: 'Module',
      validColumnsToExport: ModuleColumnsToExportXLSX
    }, Object.values(RepositoryModuleFilter), Object.values(RequestModuleFilter)))
    .use('/module',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleModel>(props, {
        validRepositoryColumns: Object.values(RepositoryModuleFilter),
        validRequestColumns: Object.values(RequestModuleFilter),
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
