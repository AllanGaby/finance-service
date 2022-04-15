import { ExcelValidationErrorType } from '@/protocols/excel'
import { random } from 'faker'

export const mockExcelValidationErrorType = (): ExcelValidationErrorType =>
  random.arrayElement(Object.values(ExcelValidationErrorType))
