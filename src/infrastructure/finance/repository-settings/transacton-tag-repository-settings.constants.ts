import { RepositoryTransactionTagFilter, SearchTransactionTagFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const TransactionTagRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'transaction_tag',
    innerJoinAndSelect: {
      account: 'transaction_tag.account'
    }
  },
  columnsToFilter: Object.values(RepositoryTransactionTagFilter),
  columnsToSearch: Object.values(SearchTransactionTagFilter)
}
