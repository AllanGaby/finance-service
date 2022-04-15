import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { makeMapperCustomFiltersMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesControllerProps

export const makeListEntitiesWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: ListEntitiesWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  listAccessRules: string[],
  validRepositoryColumns: string[] = [],
  validRequestColumns: string[] = []
): Router =>
    Router()
      .get('/',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
        ExpressMiddlewareAdapter(makeMapperCustomFiltersMiddleware({
          validRepositoryColumns,
          validRequestColumns
        })),
        ExpressControllerAdapter(makeListEntitiesController<EntityType>(props, entityClass)))
