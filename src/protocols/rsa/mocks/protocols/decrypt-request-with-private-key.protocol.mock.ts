import { DecryptRequestWithPrivateKeyProtocol } from '@/protocols/rsa'
import { datatype } from 'faker'

export class DecryptRequestWithPrivateKeyProtocolSpy implements DecryptRequestWithPrivateKeyProtocol {
  token: string
  result: string = datatype.uuid()

  decrypt (token: string): string {
    this.token = token
    return this.result
  }
}
