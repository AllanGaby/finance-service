import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleAccessRuleModel
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateModuleAccessRuleFieldsValidations, makeUpdateModuleAccessRuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleAccessRuleRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps

export const makeModuleAccessRuleRoute = (props: ModuleAccessRuleRouteProps): Router =>
  Router()
    .use('/module-access-rule',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleAccessRuleModel>({
        ...props,
        repositorySettings: ModuleAccessRuleRepositorySettings
      }, {
        entityClass: ModuleAccessRuleEntity,
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
