import { EntityModel } from '@/domain/common'
import {
  DeleteEntityByIdWithAuthenticationRouteProps,
  makeDeleteEntityByIdWithAuthenticationRoute,
  GetEntityByIdWithAuthenticationRouteProps,
  makeGetEntityByIdWithAuthenticationRoute,
  ListEntitiesWithAuthenticationRouteProps,
  makeListEntitiesWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DefaultDeleteGetListEntityWithAuthenticationRoutesProps =
DeleteEntityByIdWithAuthenticationRouteProps &
GetEntityByIdWithAuthenticationRouteProps &
ListEntitiesWithAuthenticationRouteProps

export type DefaultDeleteGetListEntityWithAuthenticationRoutesOptions<EntityType extends EntityModel> = {
  entityClass: EntityTarget<EntityType>
  paramIdName: string
  entityName: string
  deleteAccessRules: string[]
  getByIdAccessRules: string[]
  listAccessRules: string[]
}

export const makeDefaultDeleteGetListEntityWithAuthenticationRoutes = <EntityType extends EntityModel>(
  props: DefaultDeleteGetListEntityWithAuthenticationRoutesProps,
  {
    entityClass,
    entityName,
    paramIdName,
    deleteAccessRules,
    getByIdAccessRules,
    listAccessRules
  }: DefaultDeleteGetListEntityWithAuthenticationRoutesOptions<EntityType>
): Router =>
    Router()
      .use('/', makeDeleteEntityByIdWithAuthenticationRoute<EntityType>(props, entityClass, paramIdName, deleteAccessRules))
      .use('/', makeGetEntityByIdWithAuthenticationRoute<EntityType>(props, entityClass, paramIdName, entityName, getByIdAccessRules))
      .use('/', makeListEntitiesWithAuthenticationRoute<EntityType>(props, entityClass, listAccessRules))
