import { ExcelColumnHeaderModel, mockExcelValidationType, mockExcelValidationErrorType } from '@/protocols/excel'
import { database, datatype } from 'faker'

export const mockExcelColumnHeaderModel = (): ExcelColumnHeaderModel => ({
  caption: datatype.string(),
  header: database.column(),
  width: datatype.boolean() ? datatype.number() : undefined,
  items: [
    datatype.string(),
    datatype.string(),
    datatype.string(),
    datatype.string(),
    datatype.string()
  ],
  promptTitle: datatype.string(),
  prompt: datatype.string(),
  error: datatype.string(),
  validationType: mockExcelValidationType(),
  errorType: mockExcelValidationErrorType()
})
