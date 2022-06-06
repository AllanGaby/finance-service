import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { UpdateEntityByIdControllerProps, makeUpdateEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCommonFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { UpdateEntityByIdController } from '@/presentation/common'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type UpdateEntityByIdRouteProps =
Omit<Omit<UpdateEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeUpdateEntityByIdRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = Partial<EntityType>>(
  props: UpdateEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  fieldsValidation: FieldValidationModel[],
  putMethod: boolean = true,
  updateEntityByIdController?: UpdateEntityByIdController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!updateEntityByIdController) {
    updateEntityByIdController = makeUpdateEntityByIdController<EntityType>({
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
          ExpressControllerAdapter(updateEntityByIdController))
    }
    return Router()
      .patch(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(updateEntityByIdController))
  }
  if (putMethod) {
    return Router()
      .put(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressControllerAdapter(updateEntityByIdController))
  }
  return Router()
    .patch(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(updateEntityByIdController))
}
