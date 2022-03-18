import { CreateJsonWebTokenProtocol, CreateJsonWebTokenDTO } from '@/protocols/jwt'

export class CreateJsonWebTokenProtocolSpy implements CreateJsonWebTokenProtocol {
  params: CreateJsonWebTokenDTO
  expiresIn: string
  token: string

  async createJWT (params: CreateJsonWebTokenDTO, expiresIn: string): Promise<string> {
    this.params = params
    this.expiresIn = expiresIn
    return this.token
  }
}
