import { CreateTwoFactorAuthenticationSecretDTO } from '@/protocols/two-factor-authentication'
import { datatype } from 'faker'

export const mockCreateTwoFactorAuthenticationSecretDTO = (): CreateTwoFactorAuthenticationSecretDTO => ({
  accountId: datatype.uuid(),
  name: datatype.uuid()
})
