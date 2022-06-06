import { mockEntityModel } from '@/domain/common'
import { CompanyTypeModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockCompanyTypeModel = (): CompanyTypeModel => ({
  ...mockEntityModel(),
  name: datatype.string()
})
