import { ExcelColumnDataModel } from '@/protocols/excel'
import { datatype } from 'faker'

export const mockExcelColumnDataModel = (): ExcelColumnDataModel => ({
  content: datatype.string()
})
