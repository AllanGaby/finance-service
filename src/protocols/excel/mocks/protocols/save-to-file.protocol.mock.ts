import { SaveToFileProtocol, SetWorksheetDataDTO } from '@/protocols/excel'

export class SaveToFileProtocolSpy implements SaveToFileProtocol {
  worksheetData: SetWorksheetDataDTO[]
  filePath: string

  saveToFile (filePath: string, worksheetData: SetWorksheetDataDTO[]): void {
    this.filePath = filePath
    this.worksheetData = worksheetData
    return undefined
  }
}
