import { EntityColumnsToExportXLSXFileDTO } from '@/domain/common'

export const FinanceTransactionColumnsToExportXLSX: EntityColumnsToExportXLSXFileDTO = {
  id: {
    header: 'id',
    caption: 'Id',
    width: 20
  },
  title: {
    header: 'title',
    caption: 'Title',
    width: 50
  },
  date: {
    header: 'date',
    caption: 'Date',
    width: 50
  },
  value: {
    header: 'value',
    caption: 'Value',
    width: 50
  },
  current_portion: {
    header: 'current_portion',
    caption: 'Current portion',
    width: 50
  },
  first_portion: {
    header: 'first_portion',
    caption: 'First portion',
    width: 50
  },
  last_portion: {
    header: 'last_portion',
    caption: 'Last portion',
    width: 50
  },
  finance_account_id: {
    header: 'finance_account_id',
    caption: 'Finance account Id',
    width: 50
  },
  finance_account: {
    header: 'finance_account.name',
    caption: 'Finance account',
    width: 50
  },
  transaction_category_id: {
    header: 'transaction_category_id',
    caption: 'Transaction category Id',
    width: 50
  },
  transaction_category: {
    header: 'transaction_category',
    caption: 'Transaction category',
    width: 50
  },
  invoice_id: {
    header: 'invoice_id',
    caption: 'Invoice Id',
    width: 50
  },
  invoice_start_date: {
    header: 'invoice.start_date',
    caption: 'Invoice start date',
    width: 50
  },
  invoice_final_date: {
    header: 'invoice.final_date',
    caption: 'Invoice final date',
    width: 50
  },
  invoice_due_date: {
    header: 'invoice.due_date',
    caption: 'Invoice due date',
    width: 50
  },
  created_at: {
    header: 'created_at',
    caption: 'Created at'
  },
  updated_at: {
    header: 'updated_at',
    caption: 'Updated at'
  }
}
