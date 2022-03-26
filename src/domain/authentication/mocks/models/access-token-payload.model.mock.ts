import { AccessTokenPayloadModel } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockAccessTokenPayloadModel = (): AccessTokenPayloadModel => ({
  session_id: datatype.uuid(),
  account_id: datatype.uuid()
})
