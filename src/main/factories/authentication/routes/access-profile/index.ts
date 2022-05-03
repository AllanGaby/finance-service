import {
  RequestAccessProfileFilter,
  RepositoryAccessProfileFilter,
  AuthenticationAccessRules,
  AccessProfileColumnsToExportXLSX,
  RequestAccessProfileOrder
} from '@/domain/authentication'
import { CreateAccessProfileRouteProps, makeCreateAccessProfileRoute } from './create-access-profile.route'
import { UpdateAccessProfileByIdRouteProps, makeUpdateAccessProfileByIdRoute } from './update-access-profile-by-id.route'
import {
  DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  makeDefaultDeleteGetListEntityWithAuthenticationRoutes,
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute
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
UpdateAccessProfileByIdRouteProps & {
  logoFilePath: string
}

export const makeAccessProfileRoute = (
  props: AccessProfileRouteProps
): Router => {
  props.repositorySettings = AccessProfileRepositorySettings
  return Router()
    .use('/', makeCreateAccessProfileRoute(props, makeCreateAccessProfileFieldsValidations(), [AuthenticationAccessRules.CreateAccessProfiles]))
    .use('/', makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName: 'AccessProfile',
      validColumnsToExport: AccessProfileColumnsToExportXLSX
    },
    AccessProfileEntity,
    [AuthenticationAccessRules.ListAccessProfiles],
    Object.values(RepositoryAccessProfileFilter),
    Object.values(RequestAccessProfileFilter),
    Object.values(RequestAccessProfileOrder)
    ))
    .use('/', makeUpdateAccessProfileByIdRoute(props, 'access_profile_id', makeUpdateAccessProfileFieldsValidations(), [AuthenticationAccessRules.UpdateAccessProfiles]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      validRepositoryColumns: Object.values(RepositoryAccessProfileFilter),
      validRequestColumns: Object.values(RequestAccessProfileFilter),
      validRepositoryOrders: Object.values(RequestAccessProfileOrder),
      entityClass: AccessProfileEntity,
      paramIdName: 'access_profile_id',
      entityName: 'AccessProfile',
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccessProfiles],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccessProfiles],
      listAccessRules: [AuthenticationAccessRules.ListAccessProfiles]
    }))
}
