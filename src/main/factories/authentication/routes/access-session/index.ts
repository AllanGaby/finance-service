import { CreateAccessSessionByGoogleRouteProps, makeCreateAccessSessionByGoogleRoute } from './create-access-session-by-google.route'
import { LoginRouteProps, makeLoginRoute } from './login.route'
import { DeleteAccessSessionRouteProps, makeDeleteAccessSessionRoute } from './delete-access-session.route'
import { RefreshAccessTokenRouteProps, makeRefreshAccessTokenRoute } from './refresh-access-token.route'
import {
  makeCreateAccessSessionByProviderFieldsValidations,
  makeLoginFieldsValidations,
  makeRefreshAccessTokenFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { Router } from 'express'

export type AccessSessionRouteProps =
CreateAccessSessionByGoogleRouteProps &
LoginRouteProps &
RefreshAccessTokenRouteProps &
DeleteAccessSessionRouteProps

export const makeAccessSessionRoute = async (
  props: AccessSessionRouteProps
): Promise<Router> => {
  const createAccessSessionByGoogleRoute = await makeCreateAccessSessionByGoogleRoute(props, makeCreateAccessSessionByProviderFieldsValidations())
  return Router()
    // .use('/', createAccessSessionByGoogleRoute)
    .use('/', makeLoginRoute(props, makeLoginFieldsValidations()))
    .use('/', makeRefreshAccessTokenRoute(props, makeRefreshAccessTokenFieldsValidations()))
    .use('/', makeDeleteAccessSessionRoute(props))
}
