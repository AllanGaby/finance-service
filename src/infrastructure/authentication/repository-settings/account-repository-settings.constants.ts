import { RepositoryAccountFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccountRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'account',
    leftJoinAndSelect: {
      modules: 'account.modules',
      access_profile: 'modules.access_profile',
      module: 'access_profile.module',
      module_access_rules: 'access_profile.module_access_rules'
    }
  },
  columnsToFilter: Object.values(RepositoryAccountFilter)
}