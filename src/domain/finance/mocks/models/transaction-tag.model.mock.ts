import { mockEntityModel } from '@/domain/common'
import { mockAccountModel } from '@/domain/authentication'
import { TransactionTagModel } from '@/domain/finance'
import { datatype } from 'faker'

export const mockTransactionTagModel = (): TransactionTagModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  name: datatype.string(),
  account: mockAccountModel()
})
