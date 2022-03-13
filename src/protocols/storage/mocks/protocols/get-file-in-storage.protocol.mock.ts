import { GetFileInStorageProtocol } from '@/protocols/storage'
import { random } from 'faker'

export class GetFileInStorageProtocolSpy implements GetFileInStorageProtocol {
  fileName: string
  fileContent: Buffer = Buffer.from(random.words())

  async get (fileName: string): Promise<Buffer> {
    this.fileName = fileName
    return this.fileContent
  }
}
