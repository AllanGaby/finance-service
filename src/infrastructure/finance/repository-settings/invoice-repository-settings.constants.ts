import { RepositoryInvoiceFilter, SearchInvoiceFilter } from '@/domain/finance'
import { CommonRepositorySettingsModel } from '@/infrastructure/repositories'

export const InvoiceRepositorySettings: CommonRepositorySettingsModel = {
  join: {
    alias: 'invoice',
    innerJoinAndSelect: {
      finance_account: 'invoice.finance_account'
    },
    leftJoinAndSelect: {
      finance_account_for_payment: 'invoice.finance_account_for_payment',
      finance_translactions: 'invoice.finance_translactions'
    }
  },
  columnsToFilter: Object.values(RepositoryInvoiceFilter),
  columnsToSearch: Object.values(SearchInvoiceFilter)
}
