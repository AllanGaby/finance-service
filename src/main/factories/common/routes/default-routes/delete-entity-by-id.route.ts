import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdRouteProps =
Omit<DeleteEntityByIdControllerProps, 'paramIdName'>

export const makeDeleteEntityByIdRoute = <EntityType extends EntityModel>(
  props: DeleteEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string
): Router =>
    Router()
      .delete(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressControllerAdapter(makeDeleteEntityByIdController<EntityType>({
          ...props,
          paramIdName
        }, entityClass)))
