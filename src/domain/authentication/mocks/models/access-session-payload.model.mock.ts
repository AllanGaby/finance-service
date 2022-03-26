import { AccessSessionPayloadModel, mockAccessSessionModuleModel } from '@/domain/authentication'
import { datatype, internet } from 'faker'

export const mockAccessSessionPayloadModel = (): AccessSessionPayloadModel => ({
  account_id: datatype.uuid(),
  session_id: datatype.uuid(),
  account_name: internet.userName(),
  modules: mockAccessSessionModuleModel(),
  access_token: datatype.uuid(),
  refresh_token: datatype.uuid()
})
