export interface DeleteFileInStorageProtocol {
  delete: (fileName: string) => Promise<boolean>
}
