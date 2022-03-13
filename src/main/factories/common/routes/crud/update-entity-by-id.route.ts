import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateEntityByIdControllerProps, makeUpdateEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdRouteProps =
Omit<Omit<UpdateEntityByIdControllerProps, 'paramId'>, 'entityName'>

export const makeUpdateEntityByIdRoute = <EntityType extends EntityModel>(
  props: UpdateEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramId: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[]
): Router =>
    Router()
      .put(`/:${paramId}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramId)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
          ...props,
          paramId,
          entityName
        }, entityClass)))
