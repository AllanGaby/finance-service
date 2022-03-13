import { UploadFileToStorageProtocol, UploadStorageFileDTO } from '@/protocols/storage'

export class UploadFileToStorageProtocolSpy implements UploadFileToStorageProtocol {
  uploadParams: UploadStorageFileDTO
  isUploaded: boolean = true

  async upload (params: UploadStorageFileDTO): Promise<boolean> {
    this.uploadParams = params
    return this.isUploaded
  }
}
