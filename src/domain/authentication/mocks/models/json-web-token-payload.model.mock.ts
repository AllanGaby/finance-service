import { JsonWebTokenPayload } from '@/domain/authentication'
import { datatype } from 'faker'

export const mockJsonWebTokenPayload = (): JsonWebTokenPayload => ({
  access_token: datatype.uuid()
})
