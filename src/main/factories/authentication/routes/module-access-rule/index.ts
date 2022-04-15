import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleAccessRuleModel,
  ModuleAccessRuleColumnsToExportXLSX,
  RepositoryModuleAccessRuleFilter,
  RequestModuleAccessRuleFilter
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeListModuleAccessRulesAndExportToXLSXFileRoute } from './list-module-access-rules-and-export-to-xlsx-file.route'
import { makeCreateModuleAccessRuleFieldsValidations, makeUpdateModuleAccessRuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleAccessRuleRouteProps =
DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeModuleAccessRuleRoute = (props: ModuleAccessRuleRouteProps): Router => {
  props.repositorySettings = ModuleAccessRuleRepositorySettings
  return Router()
    .use('/module-access-rule', makeListModuleAccessRulesAndExportToXLSXFileRoute({
      ...props,
      entityName: 'ModuleAccessRule',
      validColumnsToExport: ModuleAccessRuleColumnsToExportXLSX
    }, Object.values(RepositoryModuleAccessRuleFilter), Object.values(RequestModuleAccessRuleFilter)))
    .use('/module-access-rule',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleAccessRuleModel>(props, {
        entityClass: ModuleAccessRuleEntity,
        validRepositoryColumns: Object.values(RepositoryModuleAccessRuleFilter),
        validRequestColumns: Object.values(RequestModuleAccessRuleFilter),
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
