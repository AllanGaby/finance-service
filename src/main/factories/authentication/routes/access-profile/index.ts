import {
  RequestAccessProfileFilter,
  RepositoryAccessProfileFilter
} from '@/domain/authentication'
import { CreateAccessProfileRouteProps, makeCreateAccessProfileRoute } from './create-access-profile.route'
import { UpdateAccessProfileByIdRouteProps, makeUpdateAccessProfileByIdRoute } from './update-access-profile-by-id.route'
import {
  DefaultDeleteGetListEntityRoutesProps,
  makeDefaultDeleteGetListEntityRoutes
} from '@/main/factories/common/routes'
import {
  makeCreateAccessProfileFieldsValidations,
  makeUpdateAccessProfileFieldsValidations
} from '@/main/factories/authentication/fields-validations'
import { AccessProfileEntity, AccessProfileRepositorySettings } from '@/infrastructure/authentication'
import { Router } from 'express'

export type AccessProfileRouteProps =
CreateAccessProfileRouteProps &
DefaultDeleteGetListEntityRoutesProps &
UpdateAccessProfileByIdRouteProps

export const makeAccessProfileRoute = (
  props: AccessProfileRouteProps
): Router => {
  props.repositorySettings = AccessProfileRepositorySettings
  props.validRepositoryColumns = Object.values(RepositoryAccessProfileFilter)
  props.validRequestColumns = Object.values(RequestAccessProfileFilter)
  return Router()
    .use('/', makeCreateAccessProfileRoute(props, makeCreateAccessProfileFieldsValidations()))
    .use(makeDefaultDeleteGetListEntityRoutes(props, {
      entityClass: AccessProfileEntity,
      paramIdName: 'access_profile_id',
      entityName: 'AccessProfile'
    }))
    .use('/', makeUpdateAccessProfileByIdRoute(props, 'access_profile_id', 'AccessProfile', makeUpdateAccessProfileFieldsValidations()))
}
