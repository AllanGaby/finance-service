import { RepositoryFinanceUserSettingsFilter, SearchFinanceUserSettingsFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const FinanceUserSettingsRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'finance_user_settings',
    innerJoinAndSelect: {
      account: 'finance_user_settings.account'
    }
  },
  columnsToFilter: Object.values(RepositoryFinanceUserSettingsFilter),
  columnsToSearch: Object.values(SearchFinanceUserSettingsFilter)
}
