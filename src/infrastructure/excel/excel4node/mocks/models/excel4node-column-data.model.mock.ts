import { Excel4NodeColumnDataModel } from '@/infrastructure/excel/excel4node'
import { mockExcelColumnDataModel } from '@/protocols/excel'
import { datatype } from 'faker'

export const mockExcel4NodeColumnDataModel = (): Excel4NodeColumnDataModel => ({
  ...mockExcelColumnDataModel(),
  comment: datatype.string(),
  style: {
    font: {
      bold: true
    }
  }
})
