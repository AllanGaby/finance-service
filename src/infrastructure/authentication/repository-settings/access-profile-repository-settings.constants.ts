import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccessProfileRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'access_profile',
    innerJoinAndSelect: {
      module: 'access_profile.module',
      module_access_rules: 'access_profile.module_access_rules'
    }
  }
}
