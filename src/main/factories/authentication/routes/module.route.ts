import { Router } from 'express'
import {
  ModuleModel
} from '@/domain/authentication'
import {
  ModuleEntity,
  ModuleRepositorySettings
} from '@/infrastructure/authentication'
import { CRUDEntityRouteProps, makeCrudEntityRoute } from '@/main/factories/common/routes'

export type ModuleRouteProps = CRUDEntityRouteProps

export const makeModuleRoute = (props: ModuleRouteProps): Router =>
  Router()
    .use('/module',
      makeCrudEntityRoute<ModuleModel>({
        ...props,
        repositorySettings: ModuleRepositorySettings
      }, {
        entityClass: ModuleEntity,
        paramId: 'module_id',
        entityName: 'Module'
      })
    )
