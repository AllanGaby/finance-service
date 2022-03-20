import { RepositoryAccessSessionFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const AccessSessionRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'access_session',
    innerJoinAndSelect: {
      account: 'access_session.account'
    }
  },
  columnsToFilter: Object.values(RepositoryAccessSessionFilter)
}
