import {
  RequestAccountFilter,
  RepositoryAccountFilter,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import {
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import {
  makeCreateAccountFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccountRouteProps =
CreateAccountRouteProps &
DefaultDeleteGetListEntityWithAuthenticationRoutesProps

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.validRepositoryColumns = Object.values(RepositoryAccountFilter)
  props.validRequestColumns = Object.values(RequestAccountFilter)
  props.repositorySettings = AccountRepositorySettings
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      entityClass: AccountEntity,
      entityName: 'Account',
      paramIdName: 'account_id',
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccount],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccount],
      listAccessRules: [AuthenticationAccessRules.ListAccount]
    }))
}
