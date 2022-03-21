import { Router } from 'express'
import {
  ModuleModel, RepositoryModuleFilter, RequestModuleFilter
} from '@/domain/authentication'
import {
  ModuleEntity,
  ModuleRepositorySettings
} from '@/infrastructure/authentication'
import { DefaultCRUDEntityRoutesProps, makeDefaultCRUDEntityRoutes } from '@/main/factories/common/routes'

export type ModuleRouteProps = DefaultCRUDEntityRoutesProps

export const makeModuleRoute = (props: ModuleRouteProps): Router =>
  Router()
    .use('/module',
      makeDefaultCRUDEntityRoutes<ModuleModel>({
        ...props,
        validRepositoryColumns: Object.values(RepositoryModuleFilter),
        validRequestColumns: Object.values(RequestModuleFilter),
        repositorySettings: ModuleRepositorySettings
      }, {
        entityClass: ModuleEntity,
        paramIdName: 'module_id',
        entityName: 'Module'
      })
    )
