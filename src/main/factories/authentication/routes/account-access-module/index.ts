import { Router } from 'express'
import {
  AccountAccessModuleModel,
  RepositoryAccountAccessModuleFilter,
  RequestAccountAccessModuleFilter,
  AuthenticationAccessRules,
  RequestAccountAccessModuleOrder
} from '@/domain/authentication'
import {
  AccountAccessModuleEntity,
  AccountAccessModuleRepositorySettings
} from '@/infrastructure/authentication'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateAccountAccessModuleFieldsValidations, makeUpdateAccountAccessModuleFieldsValidations } from '@/main/factories/authentication/fields-validations'

export type AccountAccessModuleRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps

export const makeAccountAccessModuleRoute = (props: AccountAccessModuleRouteProps): Router =>
  Router()
    .use('/account-access-module',
      makeDefaultCRUDEntityWithAuthenticationRoutes<AccountAccessModuleModel>({
        ...props,
        repositorySettings: AccountAccessModuleRepositorySettings
      }, {
        validRepositoryColumns: Object.values(RepositoryAccountAccessModuleFilter),
        validRequestColumns: Object.values(RequestAccountAccessModuleFilter),
        validRepositoryOrders: Object.values(RequestAccountAccessModuleOrder),
        entityClass: AccountAccessModuleEntity,
        paramIdName: 'account_access_module_id',
        entityName: 'AccountAccessModule',
        createFieldsValidation: makeCreateAccountAccessModuleFieldsValidations(),
        updateFieldsValidation: makeUpdateAccountAccessModuleFieldsValidations(),
        createAccessRules: [AuthenticationAccessRules.CreateAccountAccessModule],
        deleteAccessRules: [AuthenticationAccessRules.DeleteAccountAccessModule],
        getByIdAccessRules: [AuthenticationAccessRules.ShowAccountAccessModule],
        listAccessRules: [AuthenticationAccessRules.ListAccountAccessModule],
        updateAccessRules: [AuthenticationAccessRules.UpdateAccountAccessModule]
      })
    )
