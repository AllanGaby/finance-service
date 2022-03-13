import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccessProfileRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'access_profile',
    innerJoinAndSelect: {
      module: 'access_profile.module'
    }
  }
}
