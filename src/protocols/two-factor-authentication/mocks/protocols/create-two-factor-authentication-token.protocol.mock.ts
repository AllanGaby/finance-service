import { CreateTwoFactorAuthenticationTokenProtocol } from '@/protocols/two-factor-authentication'
import { datatype } from 'faker'

export class CreateTwoFactorAuthenticationTokenProtocolSpy implements CreateTwoFactorAuthenticationTokenProtocol {
  secret: string
  token: string = datatype.uuid()

  createToken (secret: string): string {
    this.secret = secret
    return this.token
  }
}
