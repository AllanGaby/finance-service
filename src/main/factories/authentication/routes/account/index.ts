import {
  RequestAccountFilter,
  RepositoryAccountFilter,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import { UpdateAccountByIdRouteProps, makeUpdateAccountByIdRoute } from './update-account-by-id.route'
import {
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import {
  makeCreateAccountFieldsValidations,
  makeUpdateAccountFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccountRouteProps =
CreateAccountRouteProps &
UpdateAccountByIdRouteProps &
DefaultDeleteGetListEntityWithAuthenticationRoutesProps

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.validRepositoryColumns = Object.values(RepositoryAccountFilter)
  props.validRequestColumns = Object.values(RequestAccountFilter)
  props.repositorySettings = AccountRepositorySettings
  const paramIdName = 'account_id'
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use('/', makeUpdateAccountByIdRoute(props, makeUpdateAccountFieldsValidations(), paramIdName, [AuthenticationAccessRules.UpdateAccount]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      entityClass: AccountEntity,
      entityName: 'Account',
      paramIdName,
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccount],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccount],
      listAccessRules: [AuthenticationAccessRules.ListAccount]
    }))
}
