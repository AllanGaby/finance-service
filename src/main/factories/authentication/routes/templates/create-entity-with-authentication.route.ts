
import { CheckBusinessRuleUseCase, CreateEntityDTO, EntityModel } from '@/domain/common'
import { FieldValidationModel } from '@/protocols/request-validator'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { CreateEntityController } from '@/presentation/common'
import { CreateEntityControllerProps, makeCreateEntityController } from '@/main/factories/common/controllers'
import { makeCommonFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type CreateEntityWithAuthenticationRouteProps =
  RecoverAccessSessionMiddlewareProps &
  CreateEntityControllerProps

export const makeCreateEntityWithAuthenticationRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = CreateEntityDTO<EntityType>>(
  props: CreateEntityWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  fieldsValidation: FieldValidationModel[],
  createAccessRules: string[],
  createEntityController?: CreateEntityController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!createEntityController) {
    createEntityController = makeCreateEntityController<EntityType>(props, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .post('/',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, createAccessRules)),
        ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType>(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(createEntityController))
  }
  return Router()
    .post('/',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, createAccessRules)),
      ExpressMiddlewareAdapter(makeCommonFieldValidationMiddleware(fieldsValidation)),
      ExpressControllerAdapter(createEntityController))
}
