import { Router } from 'express'
import { AuthenticationAccessRules } from '@/domain/authentication'
import {
  CompanyTypeModel,
  RepositoryCompanyTypeFilter,
  RequestCompanyTypeFilter,
  RequestCompanyTypeOrder
} from '@/domain/finance'
import {
  CompanyTypeEntity,
  CompanyTypeRepositorySettings
} from '@/infrastructure/finance'
import {
  DefaultCRUDEntityWithAuthenticationRoutesProps,
  makeDefaultCRUDEntityWithAuthenticationRoutes
} from '@/main/factories/authentication/routes'
import { makeCreateCompanyTypeFieldsValidations, makeUpdateCompanyTypeFieldsValidations } from '@/main/factories/finance'

export type CompanyTypeRouteProps = DefaultCRUDEntityWithAuthenticationRoutesProps & {
  logoFilePath: string
}

export const makeCompanyTypeRoute = (props: CompanyTypeRouteProps): Router => {
  props.repositorySettings = CompanyTypeRepositorySettings

  return Router()
    .use(makeDefaultCRUDEntityWithAuthenticationRoutes<CompanyTypeModel>(props, {
      validRepositoryColumns: Object.values(RepositoryCompanyTypeFilter),
      validRequestColumns: Object.values(RequestCompanyTypeFilter),
      validRepositoryOrders: Object.values(RequestCompanyTypeOrder),
      entityClass: CompanyTypeEntity,
      paramIdName: 'company_type_id',
      entityName: 'CompanyType',
      createFieldsValidation: makeCreateCompanyTypeFieldsValidations(),
      updateFieldsValidation: makeUpdateCompanyTypeFieldsValidations(),
      createAccessRules: [AuthenticationAccessRules.CreateCompanyType],
      updateAccessRules: [AuthenticationAccessRules.UpdateCompanyType],
      deleteAccessRules: [AuthenticationAccessRules.DeleteCompanyType],
      getByIdAccessRules: [AuthenticationAccessRules.ShowCompanyType],
      listAccessRules: [AuthenticationAccessRules.ListCompanyType]
    })
    )
}
