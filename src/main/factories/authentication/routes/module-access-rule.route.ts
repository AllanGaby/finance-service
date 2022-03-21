import { Router } from 'express'
import {
  ModuleAccessRuleModel
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import { DefaultCRUDEntityRoutesProps, makeDefaultCRUDEntityRoutes } from '@/main/factories/common/routes'

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
        entityName: 'ModuleAccessRule'
      })
    )
