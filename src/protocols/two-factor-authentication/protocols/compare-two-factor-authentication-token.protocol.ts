import { CompareTwoFactorAuthenticationTokenDTO } from '@/protocols/two-factor-authentication'

export interface CompareTwoFactorAuthenticationTokenProtocol {
  compareToken: (params: CompareTwoFactorAuthenticationTokenDTO) => boolean
}
