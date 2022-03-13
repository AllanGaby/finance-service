import { SetWorksheetDataDTO } from '@/protocols/excel'

export interface SaveToFileProtocol {
  saveToFile: (filePath: string, worksheetData: SetWorksheetDataDTO[]) => void
}
