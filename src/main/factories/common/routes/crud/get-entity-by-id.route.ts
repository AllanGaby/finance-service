import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { GetEntityByIdControllerProps, makeGetEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdRouteProps =
Omit<Omit<GetEntityByIdControllerProps, 'paramName'>, 'entityName'>

export const makeGetEntityByIdRoute = <EntityType extends EntityModel>(
  props: GetEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramName: string,
  entityName: string
): Router =>
    Router()
      .get(`/:${paramName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramName)),
        ExpressControllerAdapter(makeGetEntityByIdController<EntityType>({
          ...props,
          paramName,
          entityName
        }, entityClass)))
