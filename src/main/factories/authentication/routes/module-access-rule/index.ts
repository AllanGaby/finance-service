import { Router } from 'express'
import {
  ModuleAccessRuleModel
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import { DefaultCRUDEntityRoutesProps, makeDefaultCRUDEntityRoutes } from '@/main/factories/common/routes'
import { makeCreateModuleAccessRuleFieldsValidations, makeUpdateModuleAccessRuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleAccessRuleRouteProps = DefaultCRUDEntityRoutesProps

export const makeModuleAccessRuleRoute = (props: ModuleAccessRuleRouteProps): Router =>
  Router()
    .use('/module-access-rule',
      makeDefaultCRUDEntityRoutes<ModuleAccessRuleModel>({
        ...props,
        repositorySettings: ModuleAccessRuleRepositorySettings
      }, {
        entityClass: ModuleAccessRuleEntity,
        paramIdName: 'module_access_rule_id',
        entityName: 'ModuleAccessRule',
        createFieldsValidation: makeCreateModuleAccessRuleFieldsValidations(),
        updateFieldsValidation: makeUpdateModuleAccessRuleFieldsValidations()
      })
    )
