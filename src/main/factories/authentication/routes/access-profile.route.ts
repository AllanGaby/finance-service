import { Router } from 'express'
import {
  AccessProfileModel
} from '@/domain/authentication'
import {
  AccessProfileEntity,
  AccessProfileRepositorySettings
} from '@/infrastructure/authentication'
import { CRUDEntityRouteProps, makeCrudEntityRoute } from '@/main/factories/common/routes'

export type AccessProfileRouteProps = CRUDEntityRouteProps

export const makeAccessProfileRoute = (props: AccessProfileRouteProps): Router =>
  Router()
    .use('/access-profile',
      makeCrudEntityRoute<AccessProfileModel>({
        ...props,
        repositorySettings: AccessProfileRepositorySettings
      }, {
        entityClass: AccessProfileEntity,
        paramId: 'access_profile_id',
        entityName: 'AccessProfile'
      })
    )
