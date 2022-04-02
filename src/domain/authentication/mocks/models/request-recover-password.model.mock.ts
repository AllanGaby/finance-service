import { mockAccountModel, RequestRecoverPasswordModel } from '@/domain/authentication'
import { mockEntityModel } from '@/domain/common'
import { datatype } from 'faker'

export const mockRequestRecoverPasswordModel = (): RequestRecoverPasswordModel => ({
  ...mockEntityModel(),
  authentication_secret: datatype.uuid(),
  validation_code: datatype.number({ min: 100000, max: 999999 }).toString(),
  deleted_at: datatype.datetime(),
  account_id: datatype.uuid(),
  account: mockAccountModel()
})
