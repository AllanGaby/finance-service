import { EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateEntityByIdControllerProps, makeUpdateEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<Omit<UpdateEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateEntityByIdWithAuthenticationRoute = <EntityType extends EntityModel>(
  props: UpdateEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
  updateAccessRules: string[],
  putMethod: boolean = true
): Router => {
  if (putMethod) {
    return Router()
      .put(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
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
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateEntityByIdController<EntityType>({
        ...props,
        paramIdName,
        entityName
      }, entityClass)))
}
