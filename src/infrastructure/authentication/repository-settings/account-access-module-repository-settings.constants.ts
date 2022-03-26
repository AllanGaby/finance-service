import { RepositoryAccountAccessModuleFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccountAccessModuleRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'account_access_module',
    leftJoinAndSelect: {
      account: 'account_access_module.account',
      module: 'account_access_module.module',
      access_profile: 'account_access_module.access_profile'
    }
  },
  columnsToFilter: Object.values(RepositoryAccountAccessModuleFilter)
}
