import { CompareTwoFactorAuthenticationTokenDTO } from '@/protocols/two-factor-authentication'
import { datatype } from 'faker'

export const mockCompareTwoFactorAuthenticationTokenDTO = (): CompareTwoFactorAuthenticationTokenDTO => ({
  secret: datatype.uuid(),
  token: datatype.uuid()
})
