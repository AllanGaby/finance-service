import { Router } from 'express'
import {
  CommonAccessRules
} from '@/domain/common'
import {
  SettingsEntity
} from '@/infrastructure/common'
import {
  ListEntitiesWithAuthenticationRouteProps,
  UpdateVersionedEntityByIdWithAuthenticationRouteProps,
  makeListEntitiesWithAuthenticationRoute,
  makeUpdateVersionedEntityByIdWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeUpdateSettingsFieldsValidations } from '@/main/factories/common/fields-validations'

export type SettingsRouteProps =
ListEntitiesWithAuthenticationRouteProps &
UpdateVersionedEntityByIdWithAuthenticationRouteProps

export const makeSettingsRoute = (props: SettingsRouteProps): Router =>
  Router()
    .use(makeListEntitiesWithAuthenticationRoute<SettingsEntity>(props, SettingsEntity, [CommonAccessRules.ListSettings]))
    .use(makeUpdateVersionedEntityByIdWithAuthenticationRoute<SettingsEntity>(props, SettingsEntity, 'settings_id', 'Settings', makeUpdateSettingsFieldsValidations(), [CommonAccessRules.UpdateSettings]))
