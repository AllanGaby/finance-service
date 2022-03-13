import { CompareTwoFactorAuthenticationTokenProtocol, CreateTwoFactorAuthenticationSecretProtocol, CreateTwoFactorAuthenticationTokenProtocol } from '@/protocols/two-factor-authentication'
import { Node2FaAdapter } from './node-2-fa'

export type TwoFactorAuthenticationProtocols =
CompareTwoFactorAuthenticationTokenProtocol
| CreateTwoFactorAuthenticationSecretProtocol
| CreateTwoFactorAuthenticationTokenProtocol

export class TwoFactorAuthenticationFactory {
  public static GetTwoFactorAuthenticationAdapter<AdapterType extends TwoFactorAuthenticationProtocols>(): AdapterType {
    return new Node2FaAdapter() as unknown as AdapterType
  }
}
