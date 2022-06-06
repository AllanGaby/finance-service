import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { GetEntityByIdControllerProps, makeGetEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { GetEntityByIdController } from '@/presentation/common'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdRouteProps =
Omit<Omit<GetEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeGetEntityByIdRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: GetEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  getEntityByIdController?: GetEntityByIdController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!getEntityByIdController) {
    getEntityByIdController = makeGetEntityByIdController<EntityType>({
      ...props,
      paramIdName,
      entityName
    }, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .get(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressControllerAdapter(getEntityByIdController))
  }
  return Router()
    .get(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressControllerAdapter(getEntityByIdController))
}
