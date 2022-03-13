import { DecryptRequestWithPrivateKeyProtocol, EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import { RSAConfig } from '@/infrastructure/rsa'
import { CryptoAdapter } from './crypto'

export type RSAProtocols =
DecryptRequestWithPrivateKeyProtocol
| EncryptRequestWithPublicKeyProtocol

export class RSAFactory {
  public static getRSAAdapter<AdapterType extends RSAProtocols>(config: RSAConfig): AdapterType {
    return new CryptoAdapter(config.privateKey, config.publicKey) as unknown as AdapterType
  }
}
