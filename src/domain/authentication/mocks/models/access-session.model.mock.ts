import { mockEntityModel } from '@/domain/common'
import { AccessSessionModel, mockAccountModel, mockAccessSessionModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessSessionModel = (): AccessSessionModel => ({
  ...mockEntityModel(),
  account_id: datatype.uuid(),
  account: mockAccountModel(),
  access_session_modules: JSON.stringify(mockAccessSessionModuleModel()),
  modules: mockAccessSessionModuleModel()
})
