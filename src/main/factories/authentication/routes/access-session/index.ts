import { LoginRouteProps, makeLoginRoute } from './login.route'
import { DeleteAccessSessionRouteProps, makeDeleteAccessSessionRoute } from './delete-access-session.route'
import { RefreshAccessTokenRouteProps, makeRefreshAccessTokenRoute } from './refresh-access-token.route'
import {
  makeLoginFieldsValidations,
  makeRefreshAccessTokenFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { Router } from 'express'

export type AccessSessionRouteProps =
LoginRouteProps &
RefreshAccessTokenRouteProps &
DeleteAccessSessionRouteProps

export const makeAccessSessionRoute = (
  props: AccessSessionRouteProps
): Router =>
  Router()
    .use('/', makeLoginRoute(props, makeLoginFieldsValidations()))
    .use('/', makeRefreshAccessTokenRoute(props, makeRefreshAccessTokenFieldsValidations()))
    .use('/', makeDeleteAccessSessionRoute(props))
