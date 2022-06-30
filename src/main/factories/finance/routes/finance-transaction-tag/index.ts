import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  RepositoryFinanceTransactionTagFilter,
  RequestFinanceTransactionTagFilter
} from '@/domain/finance'
import {
  FinanceTransactionTagEntity
} from '@/infrastructure/finance'
import {
  ListEntitiesWithAuthenticationRouteProps,
  CreateEntityWithAuthenticationRouteProps,
  DeleteEntityByIdWithAuthenticationRouteProps,
  makeCreateEntityWithAuthenticationRoute,
  makeListEntitiesWithAuthenticationRoute,
  makeDeleteEntityByIdWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeCreateFinanceTransactionTagFieldsValidations } from '@/main/factories/finance'

export type FinanceTransactionTagRouteProps =
  ListEntitiesWithAuthenticationRouteProps &
  CreateEntityWithAuthenticationRouteProps &
  DeleteEntityByIdWithAuthenticationRouteProps

export const makeFinanceTransactionTagRoute = (props: FinanceTransactionTagRouteProps): Router =>
  Router()
    .use(makeCreateEntityWithAuthenticationRoute(props,
      FinanceTransactionTagEntity,
      makeCreateFinanceTransactionTagFieldsValidations(),
      [AuthenticationAccessRules.CreateFinanceTransaction]
    ))
    .use(makeDeleteEntityByIdWithAuthenticationRoute(props,
      FinanceTransactionTagEntity,
      'finance_transaction_id',
      [AuthenticationAccessRules.DeleteFinanceTransaction]
    ))
    .use(makeListEntitiesWithAuthenticationRoute(props,
      FinanceTransactionTagEntity,
      [AuthenticationAccessRules.ListFinanceTransaction],
      Object.values(RepositoryFinanceTransactionTagFilter),
      Object.values(RequestFinanceTransactionTagFilter),
      []
    ))
