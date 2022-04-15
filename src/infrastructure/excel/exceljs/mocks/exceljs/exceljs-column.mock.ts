import { Alignment, Borders, Cell, CellValue, Column, Fill, Font, Protection, Style, Worksheet } from 'exceljs'

export class ExcelJSColumnSpy implements Column {
  header?: string | string[]
  key?: string
  width?: number
  outlineLevel: number
  hidden: boolean
  style: Partial<Style>
  values: readonly CellValue[]
  letter: string
  number: number
  worksheet: Worksheet
  isCustomWidth: boolean
  headers: string[]
  isDefault: boolean
  headerCount: number
  border?: Partial<Borders>
  fill?: Fill
  numFmt?: string
  font?: Partial<Font>
  alignment?: Partial<Alignment>
  protection?: Partial<Protection>
  toString (): string {
    return undefined
  }

  equivalentTo (other: Column): boolean {
    return undefined
  }

  collapsed: boolean
  eachCell (callback: (cell: Cell, rowNumber: number) => void): void;
  eachCell (opt: { includeEmpty: boolean }, callback: (cell: Cell, rowNumber: number) => void): void;
  eachCell (opt: any, callback?: any): void {
    return undefined
  }

  defn: any
}
