import { Alignment, Borders, Cell, CellModel, CellValue, Comment, DataValidation, Fill, Font, FormulaType, Protection, Style, ValueType, Workbook, Worksheet } from 'exceljs'

export class ExcelJSCellSpy implements Cell {
  worksheet: Worksheet
  workbook: Workbook
  effectiveType: ValueType
  isMerged: boolean
  master: Cell
  isHyperlink: boolean
  hyperlink: string
  text: string
  fullAddress: { sheetName: string, address: string, row: number, col: number }
  model: CellModel
  name: string
  names: string[]
  dataValidation: DataValidation
  value: CellValue
  note: string | Comment
  formula: string
  result: string | number | Date
  type: ValueType
  formulaType: FormulaType
  style: Partial<Style>
  addName (name: string): void {
    return undefined
  }

  removeName (name: string): void {
    return undefined
  }

  removeAllNames (): void {
    return undefined
  }

  destroy (): void {
    return undefined
  }

  toCsvString (): string {
    return undefined
  }

  release (): void {
    return undefined
  }

  addMergeRef (): void {
    return undefined
  }

  releaseMergeRef (): void {
    return undefined
  }

  merge (master: Cell, ignoreStyle?: boolean): void {
    return undefined
  }

  unmerge (): void {
    return undefined
  }

  isMergedTo (master: Cell): boolean {
    return undefined
  }

  toString (): string {
    return undefined
  }

  numFmt: string
  font: Partial<Font>
  alignment: Partial<Alignment>
  protection: Partial<Protection>
  border: Partial<Borders>
  fill: Fill
  sheetName?: string
  address: string
  col: string
  row: string
  $col$row: string
}
