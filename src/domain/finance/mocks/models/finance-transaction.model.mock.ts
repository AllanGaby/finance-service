import { mockEntityModel } from '@/domain/common'
import { FinanceTransactionModel, mockFinanceAccountModel, mockFinanceTransctionType, mockInvoiceModel, mockCompanyModel, mockTransactionCategoryModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockFinanceTransactionModel = (): FinanceTransactionModel => ({
  ...mockEntityModel(),
  title: datatype.string(),
  type: mockFinanceTransctionType(),
  date: datatype.datetime(),
  date_str: datatype.datetime().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  value: datatype.number(),
  finance_account_id: datatype.uuid(),
  transaction_category_id: datatype.uuid(),
  invoice_id: datatype.uuid(),
  company_id: datatype.uuid(),
  original_finance_transaction_id: datatype.uuid(),
  transaction_category: mockTransactionCategoryModel(),
  finance_account: mockFinanceAccountModel(),
  invoice: mockInvoiceModel(),
  company: mockCompanyModel(),
  current_portion: datatype.number(),
  first_portion: datatype.number(),
  last_portion: datatype.number(),
  original_finance_transaction: mockFinanceTransactionModel()
})
