import { CreateHashProtocol, CompareHashProtocol } from '@/protocols/cryptography'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements CreateHashProtocol, CompareHashProtocol {
  public static instance: BCryptAdapter

  public static getInstance (salt: number): BCryptAdapter {
    if (!BCryptAdapter.instance) {
      BCryptAdapter.instance = new BCryptAdapter(salt)
    }
    return BCryptAdapter.instance
  }

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
