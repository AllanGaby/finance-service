import { mockEntityModel } from '@/domain/common'
import { AccountProviderModel, mockAuthenticationProvider, mockAccountModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccountProviderModel = (): AccountProviderModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  account_provider_id: datatype.uuid(),
  provider: mockAuthenticationProvider(),
  account: mockAccountModel()
})
