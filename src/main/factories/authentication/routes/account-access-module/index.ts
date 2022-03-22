import { Router } from 'express'
import {
  AccountAccessModuleModel, RepositoryAccountAccessModuleFilter, RequestAccountAccessModuleFilter
} from '@/domain/authentication'
import {
  AccountAccessModuleEntity,
  AccountAccessModuleRepositorySettings
} from '@/infrastructure/authentication'
import { DefaultCRUDEntityRoutesProps, makeDefaultCRUDEntityRoutes } from '@/main/factories/common/routes'
import { makeCreateAccountAccessModuleFieldsValidations, makeUpdateAccountAccessModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type AccountAccessModuleRouteProps = DefaultCRUDEntityRoutesProps

export const makeAccountAccessModuleRoute = (props: AccountAccessModuleRouteProps): Router =>
  Router()
    .use('/account-access-module',
      makeDefaultCRUDEntityRoutes<AccountAccessModuleModel>({
        ...props,
        validRepositoryColumns: Object.values(RepositoryAccountAccessModuleFilter),
        validRequestColumns: Object.values(RequestAccountAccessModuleFilter),
        repositorySettings: AccountAccessModuleRepositorySettings
      }, {
        entityClass: AccountAccessModuleEntity,
        paramIdName: 'account_access_module_id',
        entityName: 'AccountAccessModule',
        createFieldsValidation: makeCreateAccountAccessModuleFieldsValidations(),
        updateFieldsValidation: makeUpdateAccountAccessModuleFieldsValidations()
      })
    )
