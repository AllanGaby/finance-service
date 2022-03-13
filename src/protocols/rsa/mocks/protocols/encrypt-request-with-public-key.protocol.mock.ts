import { EncryptRequestWithPublicKeyProtocol } from '@/protocols/rsa'
import faker from 'faker'

export class EncryptRequestWithPublicKeySpy implements EncryptRequestWithPublicKeyProtocol {
  payload: string
  token: string = faker.datatype.uuid()

  createToken (payload: string): string {
    this.payload = payload
    return this.token
  }
}
