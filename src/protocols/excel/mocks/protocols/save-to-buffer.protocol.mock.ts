import { SaveToBufferProtocol, SetWorksheetDataDTO } from '@/protocols/excel'
import { datatype } from 'faker'

export class SaveToBufferProtocolSpy implements SaveToBufferProtocol {
  worksheetData: SetWorksheetDataDTO[]
  fileContent: Buffer = Buffer.from(datatype.string())

  async saveToBuffer (worksheetData: SetWorksheetDataDTO[]): Promise<Buffer> {
    this.worksheetData = worksheetData
    return this.fileContent
  }
}
