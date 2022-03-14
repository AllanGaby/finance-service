import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdRouteProps =
Omit<DeleteEntityByIdControllerProps, 'paramName'>

export const makeDeleteEntityByIdRoute = <EntityType extends EntityModel>(
  props: DeleteEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramName: string
): Router =>
    Router()
      .delete(`/:${paramName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramName)),
        ExpressControllerAdapter(makeDeleteEntityByIdController<EntityType>({
          ...props,
          paramName
        }, entityClass)))
