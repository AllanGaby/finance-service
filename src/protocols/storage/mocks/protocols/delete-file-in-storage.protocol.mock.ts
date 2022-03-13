import { DeleteFileInStorageProtocol } from '@/protocols/storage'

export class DeleteFileInStorageProtocolSpy implements DeleteFileInStorageProtocol {
  fileName: string
  result: boolean = true

  async delete (fileName: string): Promise<boolean> {
    this.fileName = fileName
    return this.result
  }
}
