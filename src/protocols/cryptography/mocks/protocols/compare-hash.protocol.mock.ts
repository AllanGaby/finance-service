import { CompareHashProtocol } from '@/protocols/cryptography'
import { datatype } from 'faker'

export class CompareHashProtocolSpy implements CompareHashProtocol {
  payload: string
  hash: string
  isValid: boolean = datatype.boolean()

  async compareHash (payload: string, hash: string): Promise<boolean> {
    this.payload = payload
    this.hash = hash
    return this.isValid
  }
}
