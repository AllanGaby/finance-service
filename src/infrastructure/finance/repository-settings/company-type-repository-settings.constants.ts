import { RepositoryCompanyTypeFilter, SearchCompanyTypeFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const CompanyTypeRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'company_type',
    leftJoinAndSelect: {
      companies: 'company_type.companies'
    }
  },
  columnsToFilter: Object.values(RepositoryCompanyTypeFilter),
  columnsToSearch: Object.values(SearchCompanyTypeFilter)
}
