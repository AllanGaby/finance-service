import { CreateJsonWebTokenProtocol, ParseJsonWebTokenProtocol, CreateJsonWebTokenDTO, JsonWebTokenModel } from '@/protocols/jwt'
import { sign, verify } from 'jsonwebtoken'

type VerifyResult = {
  iat: number
  exp: number
  sub: string
}

export class JWTAdapter implements CreateJsonWebTokenProtocol, ParseJsonWebTokenProtocol {
  constructor (
    private readonly secret: string
  ) {}

  async createJWT ({ payload, subject }: CreateJsonWebTokenDTO, expiresIn: string): Promise<string> {
    return sign(payload, this.secret, {
      subject,
      expiresIn
    })
  }

  async parseJWT (token: string): Promise<JsonWebTokenModel> {
    const result = verify(token, this.secret) as VerifyResult
    const subject = result.sub
    delete result.sub
    delete result.iat
    delete result.exp
    return {
      subject,
      payload: result
    }
  }
}
