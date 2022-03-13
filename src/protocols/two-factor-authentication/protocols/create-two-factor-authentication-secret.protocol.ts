import { CreateTwoFactorAuthenticationSecretDTO } from '@/protocols/two-factor-authentication'

export interface CreateTwoFactorAuthenticationSecretProtocol {
  createSecret: (params: CreateTwoFactorAuthenticationSecretDTO) => string
}
