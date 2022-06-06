
import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { DeleteEntityController } from '@/presentation/common'
import { DeleteEntityByIdControllerProps, makeDeleteEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type DeleteEntityByIdWithAuthenticationRouteProps =
        RecoverAccessSessionMiddlewareProps &
        Omit<DeleteEntityByIdControllerProps, 'paramIdName'>

export const makeDeleteEntityByIdWithAuthenticationRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: DeleteEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  deleteAccessRules: string[],
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
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, deleteAccessRules)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware<EntityType, CheckBusinessRuleDTOType>(checkBusinessRuleUseCase)),
        ExpressControllerAdapter(deleteEntityByIdController))
  }
  return Router()
    .delete(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, deleteAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressControllerAdapter(deleteEntityByIdController))
}
