import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdRouteProps =
Omit<DeleteEntityByIdControllerProps, 'paramId'>

export const makeDeleteEntityByIdRoute = <EntityType extends EntityModel>(
  props: DeleteEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramId: string
): Router =>
    Router()
      .delete(`/:${paramId}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramId)),
        ExpressControllerAdapter(makeDeleteEntityByIdController<EntityType>({
          ...props,
          paramId
        }, entityClass)))
