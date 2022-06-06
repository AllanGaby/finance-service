import { mockEntityModel } from '@/domain/common'
import { mockAccountModel } from '@/domain/authentication'
import { FinanceAccountModel, mockFinanceAccountType, mockCompanyModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockFinanceAccountModel = (): FinanceAccountModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  name: datatype.string(),
  type: mockFinanceAccountType(),
  company_id: datatype.uuid(),
  closing_date: datatype.datetime(),
  due_date: datatype.datetime(),
  credit_date: datatype.datetime(),
  default_credit_value: datatype.number(),
  default_credit_released: datatype.number(),
  default_finance_account_for_payment_id: datatype.uuid(),
  account: mockAccountModel(),
  company: mockCompanyModel()
})
