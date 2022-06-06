import { RepositoryFinanceTransactionFilter, SearchFinanceTransactionFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const FinanceTransactionRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'finance_transaction',
    innerJoinAndSelect: {
      finance_account: 'finance_transaction.finance_account',
      transaction_category: 'finance_transaction.transaction_category'
    },
    leftJoinAndSelect: {
      company: 'finance_transaction.company',
      original_finance_transaction: 'finance_transaction.original_finance_transaction',
      invoice: 'finance_transaction.invoice',
      finance_transactions: 'finance_transaction.finance_transactions'
    }
  },
  columnsToFilter: Object.values(RepositoryFinanceTransactionFilter),
  columnsToSearch: Object.values(SearchFinanceTransactionFilter)
}
