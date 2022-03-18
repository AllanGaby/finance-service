import {
  RequestAccountFilter,
  RepositoryAccountFilter
} from '@/domain/authentication'
import { CreateAccountRouteProps, makeCreateAccountRoute } from './create-account.route'
import {
  DeleteEntityByIdRouteProps,
  GetEntityByIdRouteProps,
  ListEntitiesRouteProps,
  makeDeleteEntityByIdRoute,
  makeGetEntityByIdRoute,
  makeListEntitiesRoute
} from '@/main/factories/common/routes'
import {
  makeCreateAccountFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccountEntity } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccountRouteProps =
CreateAccountRouteProps &
DeleteEntityByIdRouteProps &
GetEntityByIdRouteProps &
ListEntitiesRouteProps

export const makeAccountRoute = (
  props: AccountRouteProps
): Router => {
  props.validRepositoryColumns = Object.values(RepositoryAccountFilter)
  props.validRequestColumns = Object.values(RequestAccountFilter)
  return Router()
    .use('/', makeCreateAccountRoute(props, makeCreateAccountFieldsValidations()))
    .use('/', makeDeleteEntityByIdRoute(props, AccountEntity, 'account_id'))
    .use('/', makeGetEntityByIdRoute(props, AccountEntity, 'account_id', 'Account'))
    .use('/', makeListEntitiesRoute(props, AccountEntity))
}
