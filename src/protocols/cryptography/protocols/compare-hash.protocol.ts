export interface CompareHashProtocol {
  compareHash: (payload: string, hash: string) => Promise<boolean>
}
