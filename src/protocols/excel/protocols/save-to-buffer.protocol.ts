import { SetWorksheetDataDTO } from '@/protocols/excel'

export interface SaveToBufferProtocol {
  saveToBuffer: (worksheetData: SetWorksheetDataDTO[]) => Promise<Buffer>
}
