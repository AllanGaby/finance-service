import { SetWorksheetDataDTO, SetWorksheetDataProtocol } from '@/protocols/excel'

export class SetWorksheetDataSpy<WorksheetType = any> implements SetWorksheetDataProtocol<WorksheetType> {
  params: SetWorksheetDataDTO
  worksheet: WorksheetType

  setWorksheetData (params: SetWorksheetDataDTO): WorksheetType {
    this.params = params
    return this.worksheet
  }
}
