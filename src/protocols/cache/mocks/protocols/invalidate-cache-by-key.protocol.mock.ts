import { InvalidateCacheByKeyProtocol } from '@/protocols/cache'

export class InvalidateCacheByKeyProtocolSpy implements InvalidateCacheByKeyProtocol {
  key: string

  async invalidateByKey (key: string): Promise<void> {
    this.key = key
    return undefined
  }
}
