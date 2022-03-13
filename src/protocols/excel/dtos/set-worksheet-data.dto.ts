import { WorksheetHeaderModel, ExcelColumnHeaderModel, ExcelColumnDataModel } from '@/protocols/excel'

export type SetWorksheetDataDTO
  <ColumnHeaderType extends ExcelColumnHeaderModel = ExcelColumnHeaderModel,
   ColumnDataType extends ExcelColumnDataModel = ExcelColumnDataModel> = {
     name: string
     worksheetHeader?: WorksheetHeaderModel
     columnHeaders: ColumnHeaderType[]
     columnData: ColumnDataType[][]
   }
