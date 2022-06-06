import { RepositoryCompanyFilter, SearchCompanyFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const CompanyRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'company',
    innerJoinAndSelect: {
      company_type: 'company.company_type'
    }
  },
  columnsToFilter: Object.values(RepositoryCompanyFilter),
  columnsToSearch: Object.values(SearchCompanyFilter)
}
