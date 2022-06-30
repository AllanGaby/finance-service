import { RepositoryAccountProviderFilter, SearchAccountProviderFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccountProviderRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'account_provider',
    innerJoinAndSelect: {
      account: 'account_provider.account'
    }
  },
  columnsToFilter: Object.values(RepositoryAccountProviderFilter),
  columnsToSearch: Object.values(SearchAccountProviderFilter)
}
