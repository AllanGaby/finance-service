import {
  AddWorksheetOptions,
  CalculationProperties,
  Csv,
  DefinedNames,
  Image,
  Workbook,
  WorkbookModel,
  WorkbookProperties,
  WorkbookView,
  Worksheet
} from 'exceljs'
import { ExcelJSXLSXSpy } from '@/infrastructure/excel'

export class ExcelJSWorkbookSpy implements Workbook {
  constructor () {
    this.xlsx = new ExcelJSXLSXSpy()
  }

  category: string
  company: string
  creator: string
  description: string
  keywords: string
  lastModifiedBy: string
  created: Date
  manager: string
  modified: Date
  lastPrinted: Date
  properties: WorkbookProperties
  subject: string
  title: string
  calcProperties: CalculationProperties
  xlsx: ExcelJSXLSXSpy
  csv: Csv
  nextId: number
  definedNames: DefinedNames
  model: WorkbookModel
  views: WorkbookView[]
  worksheets: Worksheet[]
  addWorksheet (name?: string, options?: Partial<AddWorksheetOptions>): Worksheet {
    return undefined
  }

  removeWorksheetEx (worksheet: Worksheet): void {
    return undefined
  }

  removeWorksheet (indexOrName: string | number): void {
    return undefined
  }

  getWorksheet (indexOrName: string | number): Worksheet {
    return undefined
  }

  eachSheet (callback: (worksheet: Worksheet, id: number) => void): void {
    return undefined
  }

  clearThemes (): void {
    return undefined
  }

  addImage (img: Image): number {
    return undefined
  }

  getImage (id: number): Image {
    return undefined
  }
}
