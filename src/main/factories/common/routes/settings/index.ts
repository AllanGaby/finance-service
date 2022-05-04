import { Router } from 'express'
import {
  CommonAccessRules
} from '@/domain/common'
import {
  SettingsEntity
} from '@/infrastructure/common'
import {
  ListEntitiesWithAuthenticationRouteProps,
  makeListEntitiesWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeUpdateSettingsByIdRoute, UpdateSettingsByIdRouteProps } from './update-settings-by-id.route'
import { makeUpdateSettingsFieldsValidations } from '@/main/factories/common/fields-validations'

export type SettingsRouteProps =
ListEntitiesWithAuthenticationRouteProps &
UpdateSettingsByIdRouteProps

export const makeSettingsRoute = (props: SettingsRouteProps): Router =>
  Router()
    .use(makeListEntitiesWithAuthenticationRoute<SettingsEntity>(props, SettingsEntity, [CommonAccessRules.ListSettings]))
    .use(makeUpdateSettingsByIdRoute(props, makeUpdateSettingsFieldsValidations(), [CommonAccessRules.UpdateSettings]))
