import { Router } from 'express'
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
RequestRecoverPasswordRouteProps

export const AuthenticationModuleRoute = (props: AuthenticationRouteProps): Router =>
  Router()
    .use('/access-profile', makeAccessProfileRoute(props))
    .use('/account', makeAccountRoute(props))
    .use('/access-session', makeAccessSessionRoute(props))
    .use(makeAccountAccessModuleRoute(props))
    .use(makeModuleAccessRuleRoute(props))
    .use(makeModuleRoute(props))
    .use('/request-recover-password', makeRequestRecoverPasswordRoute(props))
