import { UploadStorageFileDTO } from '@/protocols/storage'

export interface UploadFileToStorageProtocol {
  upload: (data: UploadStorageFileDTO) => Promise<boolean>
}
