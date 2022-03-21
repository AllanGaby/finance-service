import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesRouteProps =
ListEntitiesControllerProps

export const makeListEntitiesRoute = <EntityType extends EntityModel>(
  props: ListEntitiesRouteProps,
  entityClass: EntityTarget<EntityType>
): Router =>
    Router()
      .get('/',
        ExpressControllerAdapter(makeListEntitiesController<EntityType>(props, entityClass)))
