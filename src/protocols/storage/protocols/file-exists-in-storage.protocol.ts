export interface FileExistsInStorageProtocol {
  exists: (fileName: string) => Promise<boolean>
}
