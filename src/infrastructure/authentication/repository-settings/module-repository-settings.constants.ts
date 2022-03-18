import { RepositoryModuleFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const ModuleRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'module',
    leftJoinAndSelect: {
      access_rules: 'module.access_rules'
    }
  },
  columnsToFilter: Object.values(RepositoryModuleFilter)
}
