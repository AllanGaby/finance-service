import { FullProperties, WBProps, WorkBook, WorkSheet } from 'xlsx'

export class XlsxWorkBookSpy implements WorkBook {
  Sheets: { [sheet: string]: WorkSheet }
  SheetNames: string[]
  Props?: FullProperties
  Custprops?: object
  Workbook?: WBProps
  vbaraw?: any
}
