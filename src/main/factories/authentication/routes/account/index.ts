import {
  RequestAccountFilter,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import {
  DefaultDeleteGetListEntityRoutesProps,
  makeDefaultDeleteGetListEntityRoutes
} from '@/main/factories/common/routes'
import {
  makeCreateAccountFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccountEntity, AccountRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccountRouteProps =
CreateAccountRouteProps &
DefaultDeleteGetListEntityRoutesProps

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.validRepositoryColumns = Object.values(RepositoryAccountFilter)
  props.validRequestColumns = Object.values(RequestAccountFilter)
  props.repositorySettings = AccountRepositorySettings
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use(makeDefaultDeleteGetListEntityRoutes(props, {
      entityClass: AccountEntity,
      entityName: 'Account',
      paramIdName: 'account_id'
    }))
}
