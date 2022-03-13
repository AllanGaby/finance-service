export interface InvalidateCacheByKeyProtocol {
  invalidateByKey: (key: string) => Promise<void>
}
