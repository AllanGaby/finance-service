import {
  RequestAccessProfileFilter,
  RepositoryAccessProfileFilter,
  AuthenticationAccessRules
} from '@/domain/authentication'
import { CreateAccessProfileRouteProps, makeCreateAccessProfileRoute } from './create-access-profile.route'
import { UpdateAccessProfileByIdRouteProps, makeUpdateAccessProfileByIdRoute } from './update-access-profile-by-id.route'
import {
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import {
  makeCreateAccessProfileFieldsValidations,
  makeUpdateAccessProfileFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccessProfileEntity, AccessProfileRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccessProfileRouteProps =
CreateAccessProfileRouteProps &
DefaultDeleteGetListEntityWithAuthenticationRoutesProps &
UpdateAccessProfileByIdRouteProps

export const makeAccessProfileRoute = (
  props: AccessProfileRouteProps
): Router => {
  props.repositorySettings = AccessProfileRepositorySettings
  props.validRepositoryColumns = Object.values(RepositoryAccessProfileFilter)
  props.validRequestColumns = Object.values(RequestAccessProfileFilter)
  return Router()
    .use('/', makeCreateAccessProfileRoute(props, makeCreateAccessProfileFieldsValidations(), [AuthenticationAccessRules.CreateAccessProfiles]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      entityClass: AccessProfileEntity,
      paramIdName: 'access_profile_id',
      entityName: 'AccessProfile',
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccessProfiles],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccessProfiles],
      listAccessRules: [AuthenticationAccessRules.ListAccessProfiles]
    }))
    .use('/', makeUpdateAccessProfileByIdRoute(props, 'access_profile_id', makeUpdateAccessProfileFieldsValidations(), [AuthenticationAccessRules.UpdateAccessProfiles]))
}
