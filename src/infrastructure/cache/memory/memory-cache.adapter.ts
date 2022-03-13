import { CreateCacheProtocol, CreateCacheDTO, RecoverCacheByKeyProtocol, InvalidateCacheByKeyProtocol } from '@/protocols/cache'

type RecordsType = {
  [key: string]: string
}

export class MemoryCacheAdapter implements CreateCacheProtocol, RecoverCacheByKeyProtocol, InvalidateCacheByKeyProtocol {
  records: RecordsType
  public static instance: MemoryCacheAdapter

  private constructor () {
    this.records = {}
  }

  public static getInstance (): MemoryCacheAdapter {
    if (!MemoryCacheAdapter.instance) {
      MemoryCacheAdapter.instance = new MemoryCacheAdapter()
    }
    return MemoryCacheAdapter.instance
  }

  async create<RecordType = object>({ key, record }: CreateCacheDTO<RecordType>): Promise<RecordType> {
    this.records[key] = JSON.stringify(record)
    return record
  }

  async recover<RecordType = object>(key: string): Promise<RecordType> {
    const record = this.records[key]
    if (record) {
      return JSON.parse(record)
    }
    return undefined
  }

  async invalidateByKey (key: string): Promise<void> {
    this.records[key] = undefined
  }
}
