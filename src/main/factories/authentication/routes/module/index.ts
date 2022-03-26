import { Router } from 'express'
import {
  AuthenticationAccessRules,
  ModuleModel, RepositoryModuleFilter, RequestModuleFilter
} from '@/domain/authentication'
import {
  ModuleEntity,
  ModuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateModuleFieldsValidations, makeUpdateModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type ModuleRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps

export const makeModuleRoute = (props: ModuleRouteProps): Router =>
  Router()
    .use('/module',
      makeDefaultCRUDEntityWithAuthenticationRoutes<ModuleModel>({
        ...props,
        validRepositoryColumns: Object.values(RepositoryModuleFilter),
        validRequestColumns: Object.values(RequestModuleFilter),
        repositorySettings: ModuleRepositorySettings
      }, {
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
