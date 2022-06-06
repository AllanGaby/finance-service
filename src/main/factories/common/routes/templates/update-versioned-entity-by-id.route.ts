import { CheckBusinessRuleUseCase, VersionedEntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateVersionedEntityByIdControllerProps, makeUpdateVersionedEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { UpdateEntityByIdController } from '@/presentation/common'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateVersionedEntityByIdRouteProps =
Omit<Omit<UpdateVersionedEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateVersionedEntityByIdRoute = <EntityType extends VersionedEntityModel, CheckBusinessRuleDTOType = Partial<EntityType>>(
  props: UpdateVersionedEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
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
          ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
          ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
          ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
          ExpressControllerAdapter(updateVersionedEntityByIdController))
    }
    return Router()
      .patch(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(updateVersionedEntityByIdController))
  }
  if (putMethod) {
    return Router()
      .put(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(updateVersionedEntityByIdController))
  }
  return Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(updateVersionedEntityByIdController))
}
