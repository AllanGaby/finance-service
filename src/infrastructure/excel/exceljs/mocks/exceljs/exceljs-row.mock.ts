import { Address, Alignment, Borders, Cell, CellValue, Fill, Font, Protection, Row, RowModel, Worksheet } from 'exceljs'

export class ExcelJSRowSpy implements Row {
  worksheet: Worksheet
  hasValues: boolean
  dimensions: number
  model: Partial<RowModel>
  height: number
  hidden: boolean
  values: CellValue[] | { [key: string]: CellValue }
  outlineLevel?: number
  number: number
  collapsed: boolean
  cellCount: number
  actualCellCount: number
  getCell (indexOrKey: string | number): Cell {
    return undefined
  }

  findCell (colNumber: number): Cell {
    return undefined
  }

  getCellEx (address: Address): Cell {
    return undefined
  }

  eachCell (callback: (cell: Cell, colNumber: number) => void): void;
  eachCell (opt: { includeEmpty: boolean }, callback: (cell: Cell, colNumber: number) => void): void;
  eachCell (opt: any, callback?: any): void {
    return undefined
  }

  splice (start: number, count: number, ...insert: any[]): void {
    return undefined
  }

  commit (): void {
    return undefined
  }

  destroy (): void {
    return undefined
  }

  addPageBreak (lft?: number, rght?: number): void {
    return undefined
  }

  numFmt: string
  font: Partial<Font>
  alignment: Partial<Alignment>
  protection: Partial<Protection>
  border: Partial<Borders>
  fill: Fill
}
