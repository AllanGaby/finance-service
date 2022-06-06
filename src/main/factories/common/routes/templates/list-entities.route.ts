import { CheckBusinessRuleUseCase, EntityModel } from '@/domain/common'
import { ExpressControllerAdapter, ExpressMiddlewareAdapter } from '@/infrastructure/route-adapters'
import { ListEntitiesControllerProps, makeListEntitiesController } from '@/main/factories/common/controllers'
import { makeCustomFiltersMapperMiddleware, makeListOrdersMapperMiddleware, makeCheckBusinessRuleMiddleware } from '@/main/factories/common/middlewares'
import { ListEntitiesController } from '@/presentation/common'
import { Router } from 'express'
import { EntityTarget } from 'typeorm'

export type ListEntitiesRouteProps =
ListEntitiesControllerProps

export const makeListEntitiesRoute = <EntityType extends EntityModel, CheckBusinessRuleDTOType = any>(
  props: ListEntitiesRouteProps,
  entityClass: EntityTarget<EntityType>,
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
