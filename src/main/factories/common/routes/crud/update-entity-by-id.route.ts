import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateEntityByIdControllerProps, makeUpdateEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdRouteProps =
Omit<Omit<UpdateEntityByIdControllerProps, 'paramName'>, 'entityName'>

export const makeUpdateEntityByIdRoute = <EntityType extends EntityModel>(
  props: UpdateEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
  putMethod: boolean = true
): Router => {
  if (putMethod) {
    return Router()
      .put(`/:${paramName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
          ...props,
          paramName,
          entityName
        }, entityClass)))
  }
  return Router()
    .patch(`/:${paramName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
        ...props,
        paramName,
        entityName
      }, entityClass)))
}
