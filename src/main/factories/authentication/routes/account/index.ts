import {
  RequestAccountFilter,
  RepositoryAccountFilter,
  AuthenticationAccessRules,
  AccountColumnsToExportXLSX
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import { UpdateAccountByIdRouteProps, makeUpdateAccountByIdRoute } from './update-account-by-id.route'
import { makeListAccountsAndExportToXLSXFileRoute } from './list-accounts-and-export-to-xlsx-file.route'
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
DefaultDeleteGetListEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.repositorySettings = AccountRepositorySettings
  const paramIdName = 'account_id'
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use('/', makeListAccountsAndExportToXLSXFileRoute({
      ...props,
      entityName: 'Account',
      validColumnsToExport: AccountColumnsToExportXLSX
    }))
    .use('/', makeUpdateAccountByIdRoute(props, makeUpdateAccountFieldsValidations(), paramIdName, [AuthenticationAccessRules.UpdateAccount]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      validRepositoryColumns: Object.values(RepositoryAccountFilter),
      validRequestColumns: Object.values(RequestAccountFilter),
      entityClass: AccountEntity,
      entityName: 'Account',
      paramIdName,
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccount],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccount],
      listAccessRules: [AuthenticationAccessRules.ListAccount]
    }))
}
