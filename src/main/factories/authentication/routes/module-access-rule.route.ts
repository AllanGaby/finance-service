import { Router } from 'express'
import {
  ModuleAccessRuleModel
} from '@/domain/authentication'
import {
  ModuleAccessRuleEntity,
  ModuleAccessRuleRepositorySettings
} from '@/infrastructure/authentication'
import { CRUDEntityRouteProps, makeCrudEntityRoute } from '@/main/factories/common/routes'

export type ModuleAccessRuleRouteProps = CRUDEntityRouteProps

export const makeModuleAccessRuleRoute = (props: ModuleAccessRuleRouteProps): Router =>
  Router()
    .use('/module-access-rule',
      makeCrudEntityRoute<ModuleAccessRuleModel>({
        ...props,
        repositorySettings: ModuleAccessRuleRepositorySettings
      }, {
        entityClass: ModuleAccessRuleEntity,
        paramId: 'module_access_rule_id',
        entityName: 'ModuleAccessRule'
      })
    )
