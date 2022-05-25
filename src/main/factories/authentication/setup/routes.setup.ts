import { Router, Express } from 'express'
import {
  AccessProfileRouteProps,
  AccessSessionRouteProps,
  AccountRouteProps,
  AccountAccessModuleRouteProps,
  ModuleAccessRuleRouteProps,
  ModuleRouteProps,
  RequestRecoverPasswordRouteProps,
  makeAccessProfileRoute,
  makeAccessSessionRoute,
  makeAccountRoute,
  makeAccountAccessModuleRoute,
  makeModuleAccessRuleRoute,
  makeModuleRoute,
  makeRequestRecoverPasswordRoute
} from '@/main/factories/authentication/routes'

export type AuthenticationRouteProps =
AccessProfileRouteProps &
AccessSessionRouteProps &
AccountRouteProps &
AccountAccessModuleRouteProps &
ModuleAccessRuleRouteProps &
ModuleRouteProps &
RequestRecoverPasswordRouteProps & {
  app: Express
}

export const AuthenticationModuleRoute = async (props: AuthenticationRouteProps): Promise<Router> => {
  const accessSessionRoute = await makeAccessSessionRoute(props)
  return Router()
    .use('/access-profile', makeAccessProfileRoute(props))
    .use('/account', makeAccountRoute(props))
    .use('/access-session', accessSessionRoute)
    .use(makeAccountAccessModuleRoute(props))
    .use(makeModuleAccessRuleRoute(props))
    .use(makeModuleRoute(props))
    .use('/request-recover-password', makeRequestRecoverPasswordRoute(props))
}
