import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateEntityByIdControllerProps, makeUpdateEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdRouteProps =
Omit<Omit<UpdateEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateEntityByIdRoute = <EntityType extends EntityModel>(
  props: UpdateEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
  putMethod: boolean = true
): Router => {
  if (putMethod) {
    return Router()
      .put(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
          ...props,
          paramIdName,
          entityName
        }, entityClass)))
  }
  return Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
        ...props,
        paramIdName,
        entityName
      }, entityClass)))
}
