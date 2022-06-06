import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { GetEntityByIdControllerProps, makeGetEntityByIdController } from '@/main/factories/common/controllers'
import { makeCommonIdFieldValidationMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { GetEntityByIdController } from '@/presentation/common'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type GetEntityByIdWithAuthenticationRouteProps =
        RecoverAccessSessionMiddlewareProps &
        Omit<Omit<GetEntityByIdControllerProps, 'paramIdName'>, 'entityName'>

export const makeGetEntityByIdWithAuthenticationRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: GetEntityByIdWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  paramIdName: string,
  entityName: string,
  getByIdAccessRules: string[],
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
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, getByIdAccessRules)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
        ExpressControllerAdapter(getEntityByIdController))
  }
  return Router()
    .get(`/:${paramIdName}`,
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, getByIdAccessRules)),
      ExpressMiddlewareAdapter(makeCommonIdFieldValidationMiddleware(paramIdName)),
      ExpressControllerAdapter(getEntityByIdController))
}
