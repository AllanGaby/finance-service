import { Router } from 'express'
import {
  SettingsRouteProps,
  makeSettingsRoute
} from '@/main/factories/common/routes'

export type CommonModuleRouteProps =
SettingsRouteProps

export const CommonModuleRoute = (props: SettingsRouteProps): Router =>
  Router()
    .use('/settings', makeSettingsRoute(props))
