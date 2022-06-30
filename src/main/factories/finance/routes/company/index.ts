import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  CompanyModel,
  RepositoryCompanyFilter,
  RequestCompanyFilter,
  RequestCompanyOrder
} from '@/domain/finance'
import {
  CompanyEntity,
  CompanyRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateCompanyFieldsValidations, makeUpdateCompanyFieldsValidations } from '@/main/factories/finance'

export type CompanyRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeCompanyRoute = (props: CompanyRouteProps): Router => {
  props.repositorySettings = CompanyRepositorySettings

  return Router()
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<CompanyModel>(props, {
      validRepositoryColumns: Object.values(RepositoryCompanyFilter),
      validRequestColumns: Object.values(RequestCompanyFilter),
      validRepositoryOrders: Object.values(RequestCompanyOrder),
      entityClass: CompanyEntity,
      paramIdName: 'company_id',
      entityName: 'Company',
      createFieldsValidation: makeCreateCompanyFieldsValidations(),
      updateFieldsValidation: makeUpdateCompanyFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateCompany],
      updateAccessRules: [AuthenticationAccessRules.UpdateCompany],
      deleteAccessRules: [AuthenticationAccessRules.DeleteCompany],
      getByIdAccessRules: [AuthenticationAccessRules.ShowCompany],
      listAccessRules: [AuthenticationAccessRules.ListCompany]
    })
    )
}
