import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteEntityController } from '@/presentation/common'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdRouteProps =
Omit<DeleteEntityByIdControllerProps, 'paramIdName'>

export const makeDeleteEntityByIdRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: DeleteEntityByIdRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  deleteEntityByIdController?: DeleteEntityController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!deleteEntityByIdController) {
    deleteEntityByIdController = makeDeleteEntityByIdController<EntityType>({
      ...props,
      paramIdName
    }, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .delete(`/:${paramIdName}`,
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType>(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(deleteEntityByIdController))
  }
  return Router()
    .delete(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressControllerAdapter(deleteEntityByIdController))
}
