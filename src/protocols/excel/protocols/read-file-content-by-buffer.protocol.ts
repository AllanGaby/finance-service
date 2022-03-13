import { FileContentModel } from '@/protocols/excel'

export interface ReadFileContentByBufferProtocol {
  getContentByBuffer: (content: Buffer) => FileContentModel
}
