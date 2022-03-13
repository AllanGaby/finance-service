import IORedis, { Redis as RedisClient, RedisOptions } from 'ioredis'
import { CreateCacheProtocol, CreateCacheDTO, RecoverCacheByKeyProtocol, InvalidateCacheByKeyProtocol } from '@/protocols/cache'

export type RedisCacheAdapterProps = RedisOptions

export class RedisCacheAdapter implements
  CreateCacheProtocol,
  RecoverCacheByKeyProtocol,
  InvalidateCacheByKeyProtocol {
  static instance: RedisCacheAdapter

  client: RedisClient

  constructor (options: RedisCacheAdapterProps) {
    this.client = new IORedis(options)
  }

  static getInstance (options: RedisCacheAdapterProps): RedisCacheAdapter {
    if (!RedisCacheAdapter.instance) {
      RedisCacheAdapter.instance = new RedisCacheAdapter(options)
    }
    return RedisCacheAdapter.instance
  }

  async create <RecordType = object>({ key, record }: CreateCacheDTO<RecordType>): Promise<RecordType> {
    await this.client.set(key, JSON.stringify(record))
    return record
  }

  async recover <RecordType = object>(key: string): Promise<RecordType> {
    const record = await this.client.get(key)
    if (record) {
      return JSON.parse(record)
    }
    return undefined
  }

  async invalidateByKey (key: string): Promise<void> {
    await this.client.del(key)
  }
}
