import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleAccessRuleModel,
  ModuleAccessRuleColumnsToExportXLSX,
  RepositoryModuleAccessRuleFilter,
  RequestModuleAccessRuleFilter,
  RequestModuleAccessRuleOrders
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes,
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeCreateModuleAccessRuleFieldsValidations, makeUpdateModuleAccessRuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleAccessRuleRouteProps =
DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeModuleAccessRuleRoute = (props: ModuleAccessRuleRouteProps): Router => {
  props.repositorySettings = ModuleAccessRuleRepositorySettings
  return Router()
    .use('/module-access-rule', makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName: 'ModuleAccessRule',
      validColumnsToExport: ModuleAccessRuleColumnsToExportXLSX
    },
    ModuleAccessRuleEntity,
    [AuthenticationAccessRules.ListModuleAccessRules],
    Object.values(RepositoryModuleAccessRuleFilter),
    Object.values(RequestModuleAccessRuleFilter),
    Object.values(RequestModuleAccessRuleOrders)
    ))
    .use('/module-access-rule',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleAccessRuleModel>(props, {
        entityClass: ModuleAccessRuleEntity,
        validRepositoryColumns: Object.values(RepositoryModuleAccessRuleFilter),
        validRequestColumns: Object.values(RequestModuleAccessRuleFilter),
        validRepositoryOrders: Object.values(RequestModuleAccessRuleOrders),
        paramIdName: 'module_access_rule_id',
        entityName: 'ModuleAccessRule',
        createFieldsValidation: makeCreateModuleAccessRuleFieldsValidations(),
        updateFieldsValidation: makeUpdateModuleAccessRuleFieldsValidations(),
        createAccessRules: [AuthenticationAccessRules.CreateModuleAccessRules],
        deleteAccessRules: [AuthenticationAccessRules.DeleteModuleAccessRules],
        getByIdAccessRules: [AuthenticationAccessRules.ShowModuleAccessRules],
        listAccessRules: [AuthenticationAccessRules.ListModuleAccessRules],
        updateAccessRules: [AuthenticationAccessRules.UpdateModuleAccessRules]
      })
    )
}
