import { EntityModel } from '@/domain/common'
import { CompanyTypeModel } from '@/domain/finance'

export type CompanyModel = EntityModel & {
  name: string
  company_type_id: string
  company_type?: CompanyTypeModel
}
