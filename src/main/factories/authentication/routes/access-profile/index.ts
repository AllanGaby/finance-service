import {
  RequestAccessProfileFilter,
  RepositoryAccessProfileFilter,
  AuthenticationAccessRules,
  AccessProfileColumnsToExportXLSX,
  RequestAccessProfileOrder
} from '@/domain/authentication'
import {
  makeCreateAccessProfileController,
  makeUpdateAccessProfileByIdController
} from '@/main/factories/authentication/controllers'
import {
  makeCreateEntityWithAuthenticationRoute,
  makeUpdateEntityByIdWithAuthenticationRoute,
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
DefaultDeleteGetListEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeAccessProfileRoute = (
  props: AccessProfileRouteProps
): Router => {
  props.repositorySettings = AccessProfileRepositorySettings
  const entityName = 'AccessProfile'
  const paramIdName = 'access_profile_id'
  return Router()
    .use('/', makeCreateEntityWithAuthenticationRoute(
      props,
      AccessProfileEntity,
      makeCreateAccessProfileFieldsValidations(),
      [AuthenticationAccessRules.CreateAccessProfiles],
      makeCreateAccessProfileController(props)))
    .use('/', makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName,
      validColumnsToExport: AccessProfileColumnsToExportXLSX
    },
    AccessProfileEntity,
    [AuthenticationAccessRules.ListAccessProfiles],
    Object.values(RepositoryAccessProfileFilter),
    Object.values(RequestAccessProfileFilter),
    Object.values(RequestAccessProfileOrder)
    ))
    .use('/', makeUpdateEntityByIdWithAuthenticationRoute(
      props,
      AccessProfileEntity,
      paramIdName,
      entityName,
      makeUpdateAccessProfileFieldsValidations(),
      [AuthenticationAccessRules.UpdateAccessProfiles],
      true,
      makeUpdateAccessProfileByIdController({
        ...props,
        paramIdName
      })
    ))
    .use(makeDefaultDeleteGetListEntityWithAuthenticationRoutes(props, {
      validRepositoryColumns: Object.values(RepositoryAccessProfileFilter),
      validRequestColumns: Object.values(RequestAccessProfileFilter),
      validRepositoryOrders: Object.values(RequestAccessProfileOrder),
      entityClass: AccessProfileEntity,
      paramIdName,
      entityName,
      deleteAccessRules: [AuthenticationAccessRules.DeleteAccessProfiles],
      getByIdAccessRules: [AuthenticationAccessRules.ShowAccessProfiles],
      listAccessRules: [AuthenticationAccessRules.ListAccessProfiles]
    }))
}
