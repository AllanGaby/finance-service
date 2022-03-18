export interface CreateHashProtocol {
  createHash: (payload: string) => Promise<string>
}
