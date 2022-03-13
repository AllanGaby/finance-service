import { SetWorksheetDataDTO, mockWorksheetHeaderModel, ExcelColumnHeaderModel, ExcelColumnDataModel } from '@/protocols/excel'
import { datatype } from 'faker'

export const mockSetWorksheetDataDTO =
  <ColumnHeaderType extends ExcelColumnHeaderModel = ExcelColumnHeaderModel,
   ColumnDataType extends ExcelColumnDataModel = ExcelColumnDataModel>(
    columnHeaders: ColumnHeaderType[] = [],
    columnData: ColumnDataType[][] = [[]]
  ): SetWorksheetDataDTO<ColumnHeaderType, ColumnDataType> =>
    ({
      name: datatype.uuid(),
      worksheetHeader: mockWorksheetHeaderModel(),
      columnHeaders,
      columnData
    })
