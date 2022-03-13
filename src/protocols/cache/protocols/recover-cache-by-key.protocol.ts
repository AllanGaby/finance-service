export interface RecoverCacheByKeyProtocol {
  recover: <RecordType = object>(key: string) => Promise<RecordType>
}
