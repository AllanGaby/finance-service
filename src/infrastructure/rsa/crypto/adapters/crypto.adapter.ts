import { DecryptRequestWithPrivateKeyProtocol, EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import crypto from 'crypto'

export class CryptoAdapter implements DecryptRequestWithPrivateKeyProtocol, EncryptRequestWithPublicKeyProtocol {
  constructor (
    private readonly privateKey: string,
    private readonly publicKey: string
  ) {}

  decrypt (token: string): string {
    return crypto.privateDecrypt({
      key: this.privateKey,
      passphrase: '',
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(token, 'base64')).toString()
  }

  createToken (payload: string): string {
    return crypto.publicEncrypt({
      key: this.publicKey,
      passphrase: '',
      padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(payload)).toString('base64')
  }
}
