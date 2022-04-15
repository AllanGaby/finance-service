import { SetWorksheetDataDTO, SetWorksheetDataProtocol } from '@/protocols/excel'

export class SetWorksheetDataProtocolSpy<WorksheetType = any> implements SetWorksheetDataProtocol<WorksheetType> {
  params: SetWorksheetDataDTO
  worksheet: WorksheetType

  setWorksheetData (worksheet: WorksheetType, params: SetWorksheetDataDTO): void {
    this.params = params
    this.worksheet = worksheet
  }
}
