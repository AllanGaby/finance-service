import { DeleteFileInStorageProtocol, FileExistsInStorageProtocol, GetFileInStorageProtocol, UploadFileToStorageProtocol } from '@/protocols/storage'
import { StorageConfig, LocalStorageAdapter } from './fs'

export type StorageProtocols =
DeleteFileInStorageProtocol
| FileExistsInStorageProtocol
| GetFileInStorageProtocol
| UploadFileToStorageProtocol

export class StorageFactory {
  public static GetStorageAdapter<AdapterType extends StorageProtocols>(config: StorageConfig): AdapterType {
    return new LocalStorageAdapter(config) as unknown as AdapterType
  }
}
