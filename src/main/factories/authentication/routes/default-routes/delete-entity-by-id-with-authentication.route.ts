import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<DeleteEntityByIdControllerProps, 'paramIdName'>

export const makeDeleteEntityByIdWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: DeleteEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  deleteAccessRules: string[]
): Router =>
    Router()
      .delete(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, deleteAccessRules)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressControllerAdapter(makeDeleteEntityByIdController<EntityType>({
          ...props,
          paramIdName
        }, entityClass)))
