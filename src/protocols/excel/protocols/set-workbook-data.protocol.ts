import { SetWorksheetDataDTO } from '@/protocols/excel'

export interface SetWorksheetDataProtocol<WorksheetType = any> {
  setWorksheetData: (worksheet: WorksheetType, params: SetWorksheetDataDTO) => void
}
