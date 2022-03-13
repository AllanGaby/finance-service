import { CreateCacheProtocol, RecoverCacheByKeyProtocol, InvalidateCacheByKeyProtocol } from '@/protocols/cache'
import { CacheConfigurationModel, CacheType } from '@/infrastructure/cache'
import { MemoryCacheAdapter } from './memory'
import { RedisCacheAdapter } from './redis'

export type CacheProtocols =
CreateCacheProtocol
| RecoverCacheByKeyProtocol
| InvalidateCacheByKeyProtocol

export class CacheFactory {
  public static getCacheAdapter<ProtocolType extends CacheProtocols>(props: CacheConfigurationModel): ProtocolType {
    switch (props.cacheType) {
      case CacheType.Memory:
        return MemoryCacheAdapter.getInstance() as unknown as ProtocolType
      case CacheType.Redis:
        return RedisCacheAdapter.getInstance(props) as unknown as ProtocolType
    }
  }
}
