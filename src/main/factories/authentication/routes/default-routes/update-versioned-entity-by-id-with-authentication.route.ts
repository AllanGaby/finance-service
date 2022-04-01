import { VersionedEntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateVersionedEntityByIdControllerProps, makeUpdateVersionedEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateVersionedEntityByIdWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<Omit<UpdateVersionedEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateVersionedEntityByIdWithAuthenticationRoute = <EntityType extends VersionedEntityModel>(
  props: UpdateVersionedEntityByIdWithAuthenticationRouteProps,
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
        ExpressControllerAdapter(makeUpdateVersionedEntityByIdController<EntityType>({
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
      ExpressControllerAdapter(makeUpdateVersionedEntityByIdController<EntityType>({
        ...props,
        paramIdName,
        entityName
      }, entityClass)))
}
