import { SaveToFileProtocol, SetWorksheetDataDTO } from '@/protocols/excel'

export class SaveToFileSpy implements SaveToFileProtocol {
  worksheetData: SetWorksheetDataDTO[]
  filePath: string

  saveToFile (filePath: string, worksheetData: SetWorksheetDataDTO[]): void {
    this.filePath = filePath
    this.worksheetData = worksheetData
    return undefined
  }
}
