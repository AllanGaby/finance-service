export interface GetFileInStorageProtocol {
  get: (fileName: string) => Promise<Buffer>
}
