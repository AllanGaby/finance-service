import { CheckBusinessRuleUseCase, VersionedEntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateVersionedEntityByIdControllerProps, makeUpdateVersionedEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'
import { UpdateEntityByIdController } from '@/presentation/common'

export type UpdateVersionedEntityByIdWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
Omit<Omit<UpdateVersionedEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateVersionedEntityByIdWithAuthenticationRoute = <EntityType extends VersionedEntityModel, CheckBusinessRuleDTOType>(
  props: UpdateVersionedEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
  updateAccessRules: string[],
  putMethod: boolean = true,
  updateVersionedEntityByIdController?: UpdateEntityByIdController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!updateVersionedEntityByIdController) {
    updateVersionedEntityByIdController = makeUpdateVersionedEntityByIdController<EntityType>({
      ...props,
      paramIdName,
      entityName
    }, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    if (putMethod) {
      return Router()
        .put(`/:${paramIdName}`,
          ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
          ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
          ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
          ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
          ExpressControllerAdapter(updateVersionedEntityByIdController))
    }
    return Router()
      .patch(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(updateVersionedEntityByIdController))
  }
  if (putMethod) {
    return Router()
      .put(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(updateVersionedEntityByIdController))
  }
  return Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, updateAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(updateVersionedEntityByIdController))
}
