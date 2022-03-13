import { ReadFileContentByBufferProtocol, FileContentModel, mockFileContentModel } from '@/protocols/excel'

export class ReadFileContentByBufferSpy implements ReadFileContentByBufferProtocol {
  content: Buffer
  fileContent: FileContentModel = mockFileContentModel()

  getContentByBuffer (content: Buffer): FileContentModel {
    this.content = content
    return this.fileContent
  }
}
