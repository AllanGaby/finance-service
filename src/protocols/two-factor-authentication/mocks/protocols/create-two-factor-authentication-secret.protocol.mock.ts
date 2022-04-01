import { CreateTwoFactorAuthenticationSecretProtocol, CreateTwoFactorAuthenticationSecretDTO } from '@/protocols/two-factor-authentication'
import { datatype } from 'faker'

export class CreateTwoFactorAuthenticationSecretProtocolSpy implements CreateTwoFactorAuthenticationSecretProtocol {
  params: CreateTwoFactorAuthenticationSecretDTO
  secret: string = datatype.uuid()

  createSecret (params: CreateTwoFactorAuthenticationSecretDTO): string {
    this.params = params
    return this.secret
  }
}
