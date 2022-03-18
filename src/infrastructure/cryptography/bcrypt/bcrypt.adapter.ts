import { CreateHashProtocol, CompareHashProtocol } from '@/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements CreateHashProtocol, CompareHashProtocol {
  constructor (
    private readonly salt: number
  ) {}

  async createHash (payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt)
  }

  async compareHash (payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash)
  }
}
