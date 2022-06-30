import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  TransactionCategoryModel,
  RepositoryTransactionCategoryFilter,
  RequestTransactionCategoryFilter,
  RequestTransactionCategoryOrder
} from '@/domain/finance'
import {
  TransactionCategoryEntity,
  TransactionCategoryRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateTransactionCategoryFieldsValidations, makeUpdateTransactionCategoryFieldsValidations } from '@/main/factories/finance'

export type TransactionCategoryRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeTransactionCategoryRoute = (props: TransactionCategoryRouteProps): Router => {
  props.repositorySettings = TransactionCategoryRepositorySettings
  props.accountIdField = RepositoryTransactionCategoryFilter.AccountId

  return Router()
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<TransactionCategoryModel>(props, {
      validRepositoryColumns: Object.values(RepositoryTransactionCategoryFilter),
      validRequestColumns: Object.values(RequestTransactionCategoryFilter),
      validRepositoryOrders: Object.values(RequestTransactionCategoryOrder),
      entityClass: TransactionCategoryEntity,
      paramIdName: 'transaction_category_id',
      entityName: 'TransactionCategory',
      createFieldsValidation: makeCreateTransactionCategoryFieldsValidations(),
      updateFieldsValidation: makeUpdateTransactionCategoryFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateTransactionCategory],
      updateAccessRules: [AuthenticationAccessRules.UpdateTransactionCategory],
      deleteAccessRules: [AuthenticationAccessRules.DeleteTransactionCategory],
      getByIdAccessRules: [AuthenticationAccessRules.ShowTransactionCategory],
      listAccessRules: [AuthenticationAccessRules.ListTransactionCategory]
    })
    )
}
