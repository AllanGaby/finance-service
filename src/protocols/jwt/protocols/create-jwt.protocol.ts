import { CreateJsonWebTokenDTO } from '@/protocols/jwt'

export interface CreateJsonWebTokenProtocol {
  createJWT: (params: CreateJsonWebTokenDTO, expiresIn: string) => Promise<string>
}
