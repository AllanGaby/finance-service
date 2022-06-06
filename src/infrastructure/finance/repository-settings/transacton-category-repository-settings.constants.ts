import { RepositoryTransactionCategoryFilter, SearchTransactionCategoryFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const TransactionCategoryRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'transaction_category',
    innerJoinAndSelect: {
      account: 'transaction_category.account'
    }
  },
  columnsToFilter: Object.values(RepositoryTransactionCategoryFilter),
  columnsToSearch: Object.values(SearchTransactionCategoryFilter)
}
