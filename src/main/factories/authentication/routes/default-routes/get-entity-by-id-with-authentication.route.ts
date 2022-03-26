import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { GetEntityByIdControllerProps, makeGetEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<Omit<GetEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeGetEntityByIdWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: GetEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  getByIdAccessRules: string[]
): Router =>
    Router()
      .get(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, getByIdAccessRules)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressControllerAdapter(makeGetEntityByIdController<EntityType>({
          ...props,
          paramIdName,
          entityName
        }, entityClass)))
