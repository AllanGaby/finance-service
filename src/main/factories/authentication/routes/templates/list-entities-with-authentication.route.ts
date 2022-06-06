import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesController } from '@/presentation/common'
import { RecoverAccessSessionMiddlewareProps, makeRecoverAccessSessionMiddleware } from '@/main/factories/authentication/middlewares'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { makeCheckBusinessRuleMiddleware, makeCustomFiltersMapperMiddleware, makeListOrdersMapperMiddleware } from '@/main/factories/common/middlewares'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesWithAuthenticationRouteProps =
RecoverAccessSessionMiddlewareProps &
ListEntitiesControllerProps

export const makeListEntitiesWithAuthenticationRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: ListEntitiesWithAuthenticationRouteProps,
  entityClass: EntityTarget<EntityType>,
  listAccessRules: string[],
  validRepositoryColumns: string[],
  validRequestColumns: string[],
  validRepositoryOrders: string[],
  listEntitiesController?: ListEntitiesController<EntityType>,
  checkBusinessRuleUseCase?: CheckBusinessRuleUseCase<EntityType, CheckBusinessRuleDTOType>
): Router => {
  if (!listEntitiesController) {
    listEntitiesController = makeListEntitiesController<EntityType>(props, entityClass)
  }
  if (checkBusinessRuleUseCase) {
    return Router()
      .get('/',
        ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
        ExpressMiddlewareAdapter(makeCheckBusinessRuleMiddleware(checkBusinessRuleUseCase)),
        ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
          validRepositoryOrders: validRepositoryOrders,
          validRequestColumns: validRequestColumns
        })),
        ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
          validRepositoryColumns: validRepositoryColumns,
          validRequestColumns: validRequestColumns
        })),
        ExpressControllerAdapter(listEntitiesController))
  }
  return Router()
    .get('/',
      ExpressMiddlewareAdapter(makeRecoverAccessSessionMiddleware(props, listAccessRules)),
      ExpressMiddlewareAdapter(makeListOrdersMapperMiddleware({
        validRepositoryOrders: validRepositoryOrders,
        validRequestColumns: validRequestColumns
      })),
      ExpressMiddlewareAdapter(makeCustomFiltersMapperMiddleware({
        validRepositoryColumns: validRepositoryColumns,
        validRequestColumns: validRequestColumns
      })),
      ExpressControllerAdapter(listEntitiesController))
}
