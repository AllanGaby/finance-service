import { Router } from 'express'
import {
  AccountAccessModuleModel, RepositoryAccountAccessModuleFilter, RequestAccountAccessModuleFilter
} from '@/domain/authentication'
import {
  AccountAccessModuleEntity,
  AccountAccessModuleRepositorySettings
} from '@/infrastructure/authentication'
import { CRUDEntityRouteProps, makeCrudEntityRoute } from '@/main/factories/common/routes'
import { makeCreateAccountAccessModuleFieldsValidations, makeUpdateAccountAccessModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type AccountAccessModuleRouteProps = CRUDEntityRouteProps

export const makeAccountAccessModuleRoute = (props: AccountAccessModuleRouteProps): Router =>
  Router()
    .use('/account-access-module',
      makeCrudEntityRoute<AccountAccessModuleModel>({
        ...props,
        validRepositoryColumns: Object.values(RepositoryAccountAccessModuleFilter),
        validRequestColumns: Object.values(RequestAccountAccessModuleFilter),
        repositorySettings: AccountAccessModuleRepositorySettings
      }, {
        entityClass: AccountAccessModuleEntity,
        paramId: 'account_access_module_id',
        entityName: 'AccountAccessModule',
        createFieldsValidation: makeCreateAccountAccessModuleFieldsValidations(),
        updateFieldsValidation: makeUpdateAccountAccessModuleFieldsValidations()
      })
    )
