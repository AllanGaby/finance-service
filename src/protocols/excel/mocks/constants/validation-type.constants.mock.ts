import { ExcelValidationType } from '@/protocols/excel'
import { random } from 'faker'

export const mockExcelValidationType = (): ExcelValidationType =>
  random.arrayElement(Object.values(ExcelValidationType))
