import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateEntityControllerProps, makeCreateEntityController } from '@/main/factories/common/controllers'
import { makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type CreateEntityRouteProps =
CreateEntityControllerProps

export const makeCreateEntityRoute = <EntityType extends EntityModel>(
  props: CreateEntityRouteProps,
  entityClass: EntityTarget<EntityType>,
  fieldsValidation: FieldValidationModel[]
): Router =>
    Router()
      .post('/',
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(makeCreateEntityController<EntityType>(props, entityClass)))
