import { Router } from 'express'
import {
  AccessProfileRouteProps,
  ModuleAccessRuleRouteProps,
  ModuleRouteProps,
  makeAccessProfileRoute,
  makeModuleAccessRuleRoute,
  makeModuleRoute
} from '@/main/factories/authentication/routes'

export type AuthenticationRouteProps =
AccessProfileRouteProps &
ModuleAccessRuleRouteProps &
ModuleRouteProps

export const AuthenticationModuleRoute = (props: AuthenticationRouteProps): Router =>
  Router()
    .use('/access-profile', makeAccessProfileRoute(props))
    .use(makeModuleAccessRuleRoute(props))
    .use(makeModuleRoute(props))
