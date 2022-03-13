import { CreateCacheDTO } from '@/protocols/cache'

export interface CreateCacheProtocol {
  create: <RecordType = object>(params: CreateCacheDTO<RecordType>) => Promise<RecordType>
}
