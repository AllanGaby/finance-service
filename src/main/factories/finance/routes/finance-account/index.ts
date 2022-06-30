import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  FinanceAccountModel,
  RepositoryFinanceAccountFilter,
  RequestFinanceAccountFilter,
  RequestFinanceAccountOrder
} from '@/domain/finance'
import {
  FinanceAccountEntity,
  FinanceAccountRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateFinanceAccountFieldsValidations, makeUpdateFinanceAccountFieldsValidations } from '@/main/factories/finance'

export type FinanceAccountRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeFinanceAccountRoute = (props: FinanceAccountRouteProps): Router => {
  props.repositorySettings = FinanceAccountRepositorySettings
  props.accountIdField = RepositoryFinanceAccountFilter.AccountId

  return Router()
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<FinanceAccountModel>(props, {
      validRepositoryColumns: Object.values(RepositoryFinanceAccountFilter),
      validRequestColumns: Object.values(RequestFinanceAccountFilter),
      validRepositoryOrders: Object.values(RequestFinanceAccountOrder),
      entityClass: FinanceAccountEntity,
      paramIdName: 'finance_account_id',
      entityName: 'FinanceAccount',
      createFieldsValidation: makeCreateFinanceAccountFieldsValidations(),
      updateFieldsValidation: makeUpdateFinanceAccountFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateFinanceAccount],
      updateAccessRules: [AuthenticationAccessRules.UpdateFinanceAccount],
      deleteAccessRules: [AuthenticationAccessRules.DeleteFinanceAccount],
      getByIdAccessRules: [AuthenticationAccessRules.ShowFinanceAccount],
      listAccessRules: [AuthenticationAccessRules.ListFinanceAccount]
    })
    )
}
