import { mockEntityModel } from '@/domain/common'
import { CompanyModel, mockCompanyTypeModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockCompanyModel = (): CompanyModel => ({
  ...mockEntityModel(),
  name: datatype.string(),
  company_type_id: datatype.uuid(),
  company_type: mockCompanyTypeModel()
})
