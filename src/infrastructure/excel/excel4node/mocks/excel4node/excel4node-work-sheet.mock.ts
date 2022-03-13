import { AddConditionalFormattingRuleOptions, AddImageOptions, Cell, Column, Row, Worksheet, WorksheetValidation } from 'excel4node'
import { Excel4NodeColumnSpy, Excel4NodeCellSpy, Excel4NodeRowSpy } from '@/infrastructure/excel/excel4node'

export class Excel4NodeWorksheetSpy implements Worksheet {
  addDataValidation (opt: WorksheetValidation): void {
    return undefined
  }

  addConditionalFormattingRule (ref: string, opt: AddConditionalFormattingRuleOptions): void {
    return undefined
  }

  column (number: number): Column {
    return new Excel4NodeColumnSpy()
  }

  row (number: number): Row {
    return new Excel4NodeRowSpy()
  }

  cell (startRow: number, startColumn: number): Cell
  cell (startRow: number, startColumn: number, endRow: number, endColumn: number): Cell
  cell (startRow: number, startColumn: number, endRow: number, endColumn: number, isMerged: boolean): Cell
  cell (startRow: any, startColumn: any, endRow?: any, endColumn?: any, isMerged?: any): import('excel4node').Cell {
    return new Excel4NodeCellSpy()
  }

  addImage (opt: AddImageOptions): void {
    return undefined
  }
}
