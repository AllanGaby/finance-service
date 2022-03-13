import { FileExistsInStorageProtocol } from '@/protocols/storage'

export class FileExistsInStorageProtocolSpy implements FileExistsInStorageProtocol {
  fileName: string
  result: boolean = true

  async exists (fileName: string): Promise<boolean> {
    this.fileName = fileName
    return this.result
  }
}
