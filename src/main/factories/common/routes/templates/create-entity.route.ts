import { CheckBusinessRuleUseCase, CreateEntityDTO, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateEntityControllerProps, makeCreateEntityController } from '@/main/factories/common/controllers'
import { makeCommonFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { CreateEntityController } from '@/presentation/common'
import { FieldValidationModel } from '@/protocols/request-validator'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type CreateEntityRouteProps =
CreateEntityControllerProps

export const makeCreateEntityRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>>(
  props: CreateEntityRouteProps,
  entityClass: EntityTarget<EntityType>,
  fieldsValidation: FieldValidationModel[],
  createEntityController?: CreateEntityController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!createEntityController) {
    createEntityController = makeCreateEntityController<EntityType>(props, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .post('/',
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType>(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(createEntityController))
  }
  return Router()
    .post('/',
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(createEntityController))
}
