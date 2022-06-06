import { mockEntityModel } from '@/domain/common'
import { InvoiceModel, mockInvoiceStatus, mockFinanceAccountModel, mockFinanceTransactionModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockInvoiceModel = (): InvoiceModel => ({
  ...mockEntityModel(),
  finance_account_id: datatype.uuid(),
  finance_account_for_payment_id: datatype.uuid(),
  finance_transaction_payment_id: datatype.uuid(),
  start_date: datatype.datetime(),
  final_date: datatype.datetime(),
  due_date: datatype.datetime(),
  start_date_str: datatype.datetime().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  final_date_str: datatype.datetime().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  due_date_str: datatype.datetime().toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  value: datatype.number(),
  value_predict: datatype.number(),
  payment_value: datatype.number(),
  status: mockInvoiceStatus(),
  value_installments: datatype.number(),
  finance_account: mockFinanceAccountModel(),
  finance_account_for_payment: mockFinanceAccountModel(),
  finance_transaction_payment: mockFinanceTransactionModel(),
  finance_translactions: [
    mockFinanceTransactionModel(),
    mockFinanceTransactionModel(),
    mockFinanceTransactionModel(),
    mockFinanceTransactionModel()
  ]
})
