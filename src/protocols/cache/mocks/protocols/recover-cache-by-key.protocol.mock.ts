import { RecoverCacheByKeyProtocol } from '@/protocols/cache'

export class RecoverCacheByKeyProtocolSpy implements RecoverCacheByKeyProtocol {
  key: string
  record: any

  async recover <RecordType = object>(key: string): Promise<RecordType> {
    this.key = key
    return this.record
  }
}
