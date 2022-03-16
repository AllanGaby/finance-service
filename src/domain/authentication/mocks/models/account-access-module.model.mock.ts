import { mockEntityModel } from '@/domain/common'
import { AccountAccessModuleModel, mockAccountModel, mockAccessProfileModel, mockModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccountAccessModuleModel = (): AccountAccessModuleModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  account: mockAccountModel(),
  access_profile_id: datatype.uuid(),
  access_profile: mockAccessProfileModel(),
  module_id: datatype.uuid(),
  module: mockModuleModel()
})
