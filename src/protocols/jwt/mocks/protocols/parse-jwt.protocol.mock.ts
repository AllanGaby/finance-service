import { ParseJsonWebTokenProtocol, JsonWebTokenModel } from '@/protocols/jwt'

export class ParseJsonWebTokenProtocolSpy implements ParseJsonWebTokenProtocol {
  payload: JsonWebTokenModel
  token: string

  async parseJWT (token: string): Promise<JsonWebTokenModel> {
    this.token = token
    return this.payload
  }
}
