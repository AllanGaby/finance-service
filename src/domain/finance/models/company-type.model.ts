import { EntityModel } from '@/domain/common'
import { CompanyModel } from '@/domain/finance'

export type CompanyTypeModel = EntityModel & {
  name: string
  companies?: CompanyModel[]
  companies_count?: number
  setCompaniesCount?: () => void
}
