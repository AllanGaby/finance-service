import { CompareTwoFactorAuthenticationTokenProtocol, CompareTwoFactorAuthenticationTokenDTO } from '@/protocols/two-factor-authentication'

export class CompareTwoFactorAuthenticationTokenSpy implements CompareTwoFactorAuthenticationTokenProtocol {
  params: CompareTwoFactorAuthenticationTokenDTO
  isTokenEquals: boolean = true

  compareToken (params: CompareTwoFactorAuthenticationTokenDTO): boolean {
    this.params = params
    return this.isTokenEquals
  }
}
