import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesControllerProps

export const makeListEntitiesWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: ListEntitiesWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  listAccessRules: string[]
): Router =>
    Router()
      .get('/',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
        ExpressControllerAdapter(makeListEntitiesController<EntityType>(props, entityClass)))
