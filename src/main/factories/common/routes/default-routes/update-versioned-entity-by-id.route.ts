import { VersionedEntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateVersionedEntityByIdControllerProps, makeUpdateVersionedEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateVersionedEntityByIdRouteProps =
Omit<Omit<UpdateVersionedEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateVersionedEntityByIdRoute = <EntityType extends VersionedEntityModel>(
  props: UpdateVersionedEntityByIdRouteProps,
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
        ExpressControllerAdapter(makeUpdateVersionedEntityByIdController<EntityType>({
          ...props,
          paramIdName,
          entityName
        }, entityClass)))
  }
  return Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(makeUpdateVersionedEntityByIdController<EntityType>({
        ...props,
        paramIdName,
        entityName
      }, entityClass)))
}
