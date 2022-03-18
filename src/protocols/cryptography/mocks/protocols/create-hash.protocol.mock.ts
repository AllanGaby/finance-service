import { CreateHashProtocol } from '@/protocols/cryptography'
import { datatype } from 'faker'

export class CreateHashProtocolSpy implements CreateHashProtocol {
  payload: string
  hash: string = datatype.uuid()

  async createHash (payload: string): Promise<string> {
    this.payload = payload
    return this.hash
  }
}
