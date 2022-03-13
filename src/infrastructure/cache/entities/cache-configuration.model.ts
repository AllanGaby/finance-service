import { RedisCacheAdapterProps } from '@/infrastructure/cache/redis'
import { CacheType } from '@/infrastructure/cache'

export type CacheConfigurationModel = RedisCacheAdapterProps & {
  cacheType: CacheType
}
