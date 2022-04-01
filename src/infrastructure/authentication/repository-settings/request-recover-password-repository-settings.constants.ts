import { RepositoryRequestRecoverPasswordFilter } from '@/domain/authentication'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const RequestRecoverPasswordRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'request_recover_password',
    innerJoinAndSelect: {
      account: 'request_recover_password.account'
    }
  },
  columnsToFilter: Object.values(RepositoryRequestRecoverPasswordFilter)
}
