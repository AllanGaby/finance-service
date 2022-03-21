import { EntityModel } from '@/domain/common'
import {
  DeleteEntityByIdRouteProps,
  makeDeleteEntityByIdRoute,
  GetEntityByIdRouteProps,
  makeGetEntityByIdRoute,
  ListEntitiesRouteProps,
  makeListEntitiesRoute
} from '@/main/factories/common/routes/default-routes'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DefaultDeleteGetListEntityRoutesProps =
DeleteEntityByIdRouteProps &
GetEntityByIdRouteProps &
ListEntitiesRouteProps

export type DefaultDeleteGetListEntityRoutesOptions<EntityType extends EntityModel> = {
  entityClass: EntityTarget<EntityType>
  paramIdName: string
  entityName: string
}

export const makeDefaultDeleteGetListEntityRoutes = <EntityType extends EntityModel>(
  props: DefaultDeleteGetListEntityRoutesProps,
  {
    entityClass,
    entityName,
    paramIdName
  }: DefaultDeleteGetListEntityRoutesOptions<EntityType>
): Router =>
    Router()
      .use('/', makeDeleteEntityByIdRoute<EntityType>(props, entityClass, paramIdName))
      .use('/', makeGetEntityByIdRoute<EntityType>(props, entityClass, paramIdName, entityName))
      .use('/', makeListEntitiesRoute<EntityType>(props, entityClass))
