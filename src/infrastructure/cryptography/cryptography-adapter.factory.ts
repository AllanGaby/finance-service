import {
  CompareHashProtocol,
  CreateHashProtocol
} from '@/protocols/cryptography'
import { BCryptAdapter } from './bcrypt'

export type CryptographyProtocols =
CompareHashProtocol &
CreateHashProtocol

export class CryptographyFactory {
  public static GetCryptographyAdapter<AdapterType extends CryptographyProtocols>(salt: number): AdapterType {
    return BCryptAdapter.getInstance(salt) as unknown as AdapterType
  }
}
