import { ExcelColumnHeaderModel } from '@/protocols/excel'
import { database, datatype } from 'faker'

export const mockExcelColumnHeaderModel = (): ExcelColumnHeaderModel => ({
  header: database.column(),
  width: datatype.number()
})
