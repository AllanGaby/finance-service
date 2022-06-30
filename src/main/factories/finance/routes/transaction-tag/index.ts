import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  TransactionTagModel,
  RepositoryTransactionTagFilter,
  RequestTransactionTagFilter,
  RequestTransactionTagOrder
} from '@/domain/finance'
import {
  TransactionTagEntity,
  TransactionTagRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateTransactionTagFieldsValidations, makeUpdateTransactionTagFieldsValidations } from '@/main/factories/finance'

export type TransactionTagRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeTransactionTagRoute = (props: TransactionTagRouteProps): Router => {
  props.repositorySettings = TransactionTagRepositorySettings
  props.accountIdField = RepositoryTransactionTagFilter.AccountId

  return Router()
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<TransactionTagModel>(props, {
      validRepositoryColumns: Object.values(RepositoryTransactionTagFilter),
      validRequestColumns: Object.values(RequestTransactionTagFilter),
      validRepositoryOrders: Object.values(RequestTransactionTagOrder),
      entityClass: TransactionTagEntity,
      paramIdName: 'transaction_tag_id',
      entityName: 'TransactionTag',
      createFieldsValidation: makeCreateTransactionTagFieldsValidations(),
      updateFieldsValidation: makeUpdateTransactionTagFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateTransactionTag],
      updateAccessRules: [AuthenticationAccessRules.UpdateTransactionTag],
      deleteAccessRules: [AuthenticationAccessRules.DeleteTransactionTag],
      getByIdAccessRules: [AuthenticationAccessRules.ShowTransactionTag],
      listAccessRules: [AuthenticationAccessRules.ListTransactionTag]
    })
    )
}
