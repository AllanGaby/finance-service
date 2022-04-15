import { AutoFilter, Cell, Column, ConditionalFormattingOptions, HeaderFooter, ImageHyperlinkValue, ImagePosition, ImageRange, Location, PageSetup, Range, Row, RowValues, Table, TableProperties, Workbook, Worksheet, WorksheetModel, WorksheetProperties, WorksheetProtection, WorksheetState, WorksheetView } from 'exceljs'
import { ExcelJSWorkbookSpy } from '@/infrastructure/excel'

export class ExcelJSWorksheetSpy implements Worksheet {
  id: number
  name: string
  workbook: Workbook
  hasMerges: boolean
  dimensions: Range
  pageSetup: Partial<PageSetup>
  headerFooter: Partial<HeaderFooter>
  state: WorksheetState
  properties: WorksheetProperties
  views: Array<Partial<WorksheetView>>
  autoFilter?: AutoFilter
  constructor () {
    this.workbook = new ExcelJSWorkbookSpy()
  }

  destroy (): void {
    return undefined
  }

  actualRowCount: number
  columnCount: number
  lastColumn: Column
  actualColumnCount: number
  getColumnKey (key: string): Column {
    return undefined
  }

  setColumnKey (key: string, value: Column): void {
    return undefined
  }

  deleteColumnKey (key: string): void {
    return undefined
  }

  eachColumnKey (callback: (col: Column, index: number) => void): void {
    return undefined
  }

  getColumn (indexOrKey: string | number): Column {
    return undefined
  }

  spliceColumns (start: number, count: number, ...insert: any[][]): void {
    return undefined
  }

  columns: Array<Partial<Column>>
  rowCount: number
  lastRow: Row
  findRow (row: number): Row {
    return undefined
  }

  findRows (start: number, length: number): Row[] {
    return undefined
  }

  spliceRows (start: number, count: number, ...insert: any[][]): void {
    return undefined
  }

  addRow (data: any, style?: string): Row {
    return undefined
  }

  addRows (rows: any[], style?: string): Row[] {
    return undefined
  }

  insertRow (pos: number, value: any, style?: string): Row {
    return undefined
  }

  insertRows (pos: number, values: any[], style?: string): Row[] {
    return undefined
  }

  duplicateRow (rowNum: number, count: number, insert: boolean): void {
    return undefined
  }

  getRow (index: number): Row {
    return undefined
  }

  getRows (start: number, length: number): Row[] {
    return undefined
  }

  eachRow (callback: (row: Row, rowNumber: number) => void): void;
  eachRow (opt: { includeEmpty: boolean }, callback: (row: Row, rowNumber: number) => void): void;
  eachRow (opt: any, callback?: any): void {
    return undefined
  }

  getSheetValues (): RowValues[] {
    return undefined
  }

  findCell (r: string | number, c: string | number): Cell {
    return undefined
  }

  getCell (r: string | number, c?: string | number): Cell {
    return undefined
  }

  mergeCells (): void;
  mergeCells (v: Range): void;
  mergeCells (v: string): void;
  mergeCells (v: Location): void;
  mergeCells (top: number, left: number, bottom: number, right: number, sheetName?: string): void;
  mergeCells (tl: string, br: string, sheetName?: string): void;
  mergeCells (v: [string, string]): void;
  mergeCells (v: [string, string, string]): void;
  mergeCells (v: [number, number, number, number]): void;
  mergeCells (v: [number, number, number, number, string]): void;
  mergeCells (top?: any, left?: any, bottom?: any, right?: any, sheetName?: any): void {
    return undefined
  }

  mergeCellsWithoutStyle (): void;
  mergeCellsWithoutStyle (v: Range): void;
  mergeCellsWithoutStyle (v: string): void;
  mergeCellsWithoutStyle (v: Location): void;
  mergeCellsWithoutStyle (top: number, left: number, bottom: number, right: number, sheetName?: string): void;
  mergeCellsWithoutStyle (tl: string, br: string, sheetName?: string): void;
  mergeCellsWithoutStyle (v: [string, string]): void;
  mergeCellsWithoutStyle (v: [string, string, string]): void;
  mergeCellsWithoutStyle (v: [number, number, number, number]): void;
  mergeCellsWithoutStyle (v: [number, number, number, number, string]): void;
  mergeCellsWithoutStyle (top?: any, left?: any, bottom?: any, right?: any, sheetName?: any): void {
    return undefined
  }

  unMergeCells (): void;
  unMergeCells (v: Range): void;
  unMergeCells (v: string): void;
  unMergeCells (v: Location): void;
  unMergeCells (top: number, left: number, bottom: number, right: number, sheetName?: string): void;
  unMergeCells (tl: string, br: string, sheetName?: string): void;
  unMergeCells (v: [string, string]): void;
  unMergeCells (v: [string, string, string]): void;
  unMergeCells (v: [number, number, number, number]): void;
  unMergeCells (v: [number, number, number, number, string]): void;
  unMergeCells (top?: any, left?: any, bottom?: any, right?: any, sheetName?: any): void {
    return undefined
  }

  fillFormula (range: string | Range | Location, formula: string, results?: ((r: number, c: number) => string | number) | number[] | number[][]): void {
    return undefined
  }

  addBackgroundImage (imageId: number): void {
    return undefined
  }

  getBackgroundImageId (): string {
    return undefined
  }

  addImage (imageId: number, range: string | ({ editAs?: string } & ImageRange & { hyperlinks?: ImageHyperlinkValue }) | ({ editAs?: string } & ImagePosition & { hyperlinks?: ImageHyperlinkValue })): void {
    return undefined
  }

  getImages (): Array<{ type: 'image', imageId: string, range: ImageRange }> {
    return undefined
  }

  commit (): void {
    return undefined
  }

  model: WorksheetModel
  async protect (password: string, options: Partial<WorksheetProtection>): Promise<void> {
    return undefined
  }

  unprotect (): void {
    return undefined
  }

  addTable (tableProperties: TableProperties): Table {
    return undefined
  }

  getTable (name: string): Table {
    return undefined
  }

  removeTable (name: string): void {
    return undefined
  }

  getTables (): Array<[Table, undefined]> {
    return undefined
  }

  addConditionalFormatting (cf: ConditionalFormattingOptions): void {
    return undefined
  }

  removeConditionalFormatting (filter: any): void {
    return undefined
  }
}
