import { CreateCacheProtocol, CreateCacheDTO } from '@/protocols/cache'

export class CreateCacheProtocolSpy implements CreateCacheProtocol {
  params: any
  record: any

  async create <RecordType = object>(params: CreateCacheDTO<RecordType>): Promise<RecordType> {
    this.params = params
    return this.record
  }
}
