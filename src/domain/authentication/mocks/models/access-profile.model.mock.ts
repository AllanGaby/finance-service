import { mockEntityModel } from '@/domain/common'
import { AccessProfileModel, mockModuleModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessProfileModel = (): AccessProfileModel => ({
  ...mockEntityModel(),
  name: datatype.string(),
  enabled: datatype.boolean(),
  module_id: datatype.uuid(),
  module: mockModuleModel()
})
