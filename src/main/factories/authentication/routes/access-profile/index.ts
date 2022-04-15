import {
  RequestAccessProfileFilter,
  RepositoryAccessProfileFilter,
  AuthenticationAccessRules,
  AccessProfileColumnsToExportXLSX
} from '@/domain/authentication'
import { CreateAccessProfileRouteProps, makeCreateAccessProfileRoute } from './create-access-profile.route'
import { UpdateAccessProfileByIdRouteProps, makeUpdateAccessProfileByIdRoute } from './update-access-profile-by-id.route'
import { makeListAccessProfilesAndExportToXLSXFileRoute } from './list-access-profiles-and-export-to-xlsx-file.route'
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
UpdateAccessProfileByIdRouteProps & {
  logoFilePath: string
}

export const makeAccessProfileRoute = (
  props: AccessProfileRouteProps
): Router => {
  props.repositorySettings = AccessProfileRepositorySettings
  return Router()
    .use('/', makeCreateAccessProfileRoute(props, makeCreateAccessProfileFieldsValidations(), [AuthenticationAccessRules.CreateAccessProfiles]))
    .use('/', makeListAccessProfilesAndExportToXLSXFileRoute({
      ...props,
      entityName: 'AccessProfile',
      validColumnsToExport: AccessProfileColumnsToExportXLSX
    }))
    .use('/', makeUpdateAccessProfileByIdRoute(props, 'access_profile_id', makeUpdateAccessProfileFieldsValidations(), [AuthenticationAccessRules.UpdateAccessProfiles]))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      validRepositoryColumns: Object.values(RepositoryAccessProfileFilter),
      validRequestColumns: Object.values(RequestAccessProfileFilter),
      entityClass: AccessProfileEntity,
      paramIdName: 'access_profile_id',
      entityName: 'AccessProfile',
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccessProfiles],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccessProfiles],
      listAccessRules: [AuthenticationAccessRules.ListAccessProfiles]
    }))
}
