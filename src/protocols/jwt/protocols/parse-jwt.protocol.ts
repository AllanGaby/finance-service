import { JsonWebTokenModel } from '@/protocols/jwt'

export interface ParseJsonWebTokenProtocol {
  parseJWT: (token: string) => Promise<JsonWebTokenModel>
}
