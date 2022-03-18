import { Router } from 'express'
import {
  AccessProfileRouteProps,
  AccountRouteProps,
  ModuleAccessRuleRouteProps,
  ModuleRouteProps,
  makeAccessProfileRoute,
  makeAccountRoute,
  makeModuleAccessRuleRoute,
  makeModuleRoute
} from '@/main/factories/authentication/routes'

export type AuthenticationRouteProps =
AccessProfileRouteProps &
AccountRouteProps &
ModuleAccessRuleRouteProps &
ModuleRouteProps

export const AuthenticationModuleRoute = (props: AuthenticationRouteProps): Router =>
  Router()
    .use('/access-profile', makeAccessProfileRoute(props))
    .use('/account', makeAccountRoute(props))
    .use(makeModuleAccessRuleRoute(props))
    .use(makeModuleRoute(props))
