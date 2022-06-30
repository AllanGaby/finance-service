import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  FinanceTransactionModel,
  RepositoryFinanceTransactionFilter,
  RequestFinanceTransactionFilter,
  RequestFinanceTransactionOrder,
  FinanceTransactionColumnsToExportXLSX
} from '@/domain/finance'
import {
  FinanceTransactionEntity,
  FinanceTransactionRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes,
  makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute
} from '@/main/factories/authentication/routes'
import { makeCreateFinanceTransactionFieldsValidations, makeUpdateFinanceTransactionFieldsValidations } from '@/main/factories/finance'

export type FinanceTransactionRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeFinanceTransactionRoute = (props: FinanceTransactionRouteProps): Router => {
  props.repositorySettings = FinanceTransactionRepositorySettings
  props.accountIdField = RepositoryFinanceTransactionFilter.FinanceAccountAccountId

  return Router()
    .use(makeListEntitiesAndExportToXLSXFileWithAuthenticationRoute({
      ...props,
      entityName: 'FinanceTransaction',
      validColumnsToExport: FinanceTransactionColumnsToExportXLSX
    },
    FinanceTransactionEntity,
    [AuthenticationAccessRules.ListFinanceTransaction],
    Object.values(RepositoryFinanceTransactionFilter),
    Object.values(RequestFinanceTransactionFilter),
    Object.values(RequestFinanceTransactionOrder)
    ))
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<FinanceTransactionModel>(props, {
      validRepositoryColumns: Object.values(RepositoryFinanceTransactionFilter),
      validRequestColumns: Object.values(RequestFinanceTransactionFilter),
      validRepositoryOrders: Object.values(RequestFinanceTransactionOrder),
      entityClass: FinanceTransactionEntity,
      paramIdName: 'finance_transaction_id',
      entityName: 'FinanceTransaction',
      createFieldsValidation: makeCreateFinanceTransactionFieldsValidations(),
      updateFieldsValidation: makeUpdateFinanceTransactionFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateFinanceTransaction],
      updateAccessRules: [AuthenticationAccessRules.UpdateFinanceTransaction],
      deleteAccessRules: [AuthenticationAccessRules.DeleteFinanceTransaction],
      getByIdAccessRules: [AuthenticationAccessRules.ShowFinanceTransaction],
      listAccessRules: [AuthenticationAccessRules.ListFinanceTransaction]
    })
    )
}
