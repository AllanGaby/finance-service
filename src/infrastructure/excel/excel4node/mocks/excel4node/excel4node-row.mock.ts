import { Row, RowColumnBase } from 'excel4node'

export class Excel4NodeRowSpy implements Row {
  setHeight (number: number): RowColumnBase {
    return undefined
  }

  freeze (): RowColumnBase;
  freeze (number: number): RowColumnBase;
  freeze (number?: any): import('excel4node').RowColumnBase {
    return undefined
  }

  filter (): RowColumnBase;
  filter (opt: { firstRow?: number, firstColumn?: number, lastRow?: number, lastColumn?: number }): RowColumnBase;
  filter (opt?: any): import('excel4node').RowColumnBase {
    return undefined
  }

  hide (): RowColumnBase {
    return undefined
  }

  group (number: number): RowColumnBase;
  group (number: number, collapse: boolean): RowColumnBase;
  group (number: any, collapse?: any): import('excel4node').RowColumnBase {
    return undefined
  }
}
