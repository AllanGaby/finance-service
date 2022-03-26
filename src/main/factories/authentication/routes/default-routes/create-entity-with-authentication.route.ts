import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateEntityControllerProps, makeCreateEntityController } from '@/main/factories/common/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type CreateEntityWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
CreateEntityControllerProps

export const makeCreateEntityWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: CreateEntityWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  fieldsValidation: FieldValidationModel[],
  createAccessRules: string[]
): Router =>
    Router()
      .post('/',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, createAccessRules)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(makeCreateEntityController<EntityType>(props, entityClass)))
