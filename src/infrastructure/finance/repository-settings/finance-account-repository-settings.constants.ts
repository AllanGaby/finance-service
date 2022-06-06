import { RepositoryFinanceAccountFilter, SearchFinanceAccountFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const FinanceAccountRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'finance_account',
    innerJoinAndSelect: {
      account: 'finance_account.account'
    },
    leftJoinAndSelect: {
      company: 'finance_account.company',
      default_finance_account_for_payment: 'finance_account.default_finance_account_for_payment',
      invoices: 'finance_account.invoices'
    }
  },
  columnsToFilter: Object.values(RepositoryFinanceAccountFilter),
  columnsToSearch: Object.values(SearchFinanceAccountFilter)
}
