import {
  CreateTwoFactorAuthenticationSecretProtocol,
  CreateTwoFactorAuthenticationSecretDTO,
  CreateTwoFactorAuthenticationTokenProtocol,
  CompareTwoFactorAuthenticationTokenProtocol,
  CompareTwoFactorAuthenticationTokenDTO
} from '@/protocols/two-factor-authentication'
import { generateSecret, generateToken, verifyToken } from 'node-2fa'

export class Node2FaAdapter implements CreateTwoFactorAuthenticationSecretProtocol, CreateTwoFactorAuthenticationTokenProtocol, CompareTwoFactorAuthenticationTokenProtocol {
  createSecret ({ accountId, name }: CreateTwoFactorAuthenticationSecretDTO): string {
    return generateSecret({
      name,
      account: accountId
    }).secret
  }

  createToken (secret: string): string {
    return generateToken(secret).token
  }

  compareToken ({ secret, token }: CompareTwoFactorAuthenticationTokenDTO): boolean {
    return verifyToken(secret, token, 60).delta === 0
  }
}
