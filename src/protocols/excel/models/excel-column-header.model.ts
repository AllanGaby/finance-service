import { ExcelValidationErrorType, ExcelValidationType } from '@/protocols/excel'

export type ExcelColumnHeaderModel = {
  caption: string
  header: string
  width?: number
  items?: string[]
  promptTitle?: string
  prompt?: string
  error?: string
  validationType?: ExcelValidationType
  errorType?: ExcelValidationErrorType
}
