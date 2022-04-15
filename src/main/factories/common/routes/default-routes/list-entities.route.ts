import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { makeMapperCustomFiltersMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesRouteProps =
ListEntitiesControllerProps & {
  validRepositoryColumns: string[]
  validRequestColumns: string[]
}

export const makeListEntitiesRoute = <EntityType extends EntityModel>(
  props: ListEntitiesRouteProps,
  entityClass: EntityTarget<EntityType>
): Router =>
    Router()
      .get('/',
        ExpressMiddlewareAdapter(makeMapperCustomFiltersMiddleware({
          validRepositoryColumns: props.validRepositoryColumns,
          validRequestColumns: props.validRequestColumns
        })),
        ExpressControllerAdapter(makeListEntitiesController<EntityType>(props, entityClass)))
