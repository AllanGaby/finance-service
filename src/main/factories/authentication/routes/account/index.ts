import {
  RequestAccountFilter,
  RepositoryAccountFilter,
  AuthenticationAccessRules,
  AccountColumnsToExportXLSX,
  RequestAccountOrder
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import { UpdateAccountByIdRouteProps, makeUpdateAccountByIdRoute } from './update-account-by-id.route'
import {
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes,
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import {
  makeCreateAccountFieldsValidations,
  makeUpdateAccountFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import { Router, Express } from 'express'

export type AccountRouteProps =
CreateAccountRouteProps &
UpdateAccountByIdRouteProps &
DefaultDeleteGetListEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
  app: Express
}

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.repositorySettings = AccountRepositorySettings
  const paramIdName = 'account_id'
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use('/', makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName: 'Account',
      validColumnsToExport: AccountColumnsToExportXLSX
    },
    AccountEntity,
    [AuthenticationAccessRules.ListAccount],
    Object.values(RepositoryAccountFilter),
    Object.values(RequestAccountFilter),
    Object.values(RequestAccountOrder)
    ))
    .use('/', makeUpdateAccountByIdRoute(props, makeUpdateAccountFieldsValidations(), paramIdName, [AuthenticationAccessRules.UpdateAccount]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      validRepositoryColumns: Object.values(RepositoryAccountFilter),
      validRequestColumns: Object.values(RequestAccountFilter),
      validRepositoryOrders: Object.values(RequestAccountOrder),
      entityClass: AccountEntity,
      entityName: 'Account',
      paramIdName,
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccount],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccount],
      listAccessRules: [AuthenticationAccessRules.ListAccount]
    }))
}
