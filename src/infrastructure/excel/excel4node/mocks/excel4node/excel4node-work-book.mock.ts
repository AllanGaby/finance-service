import { Style, Workbook, Worksheet, WorksheetOption } from 'excel4node'
import { Stats } from 'fs'

export class Excel4NodeWorkbookSpy implements Workbook {
  addWorksheet (sheet: string): Worksheet;
  addWorksheet (opts: WorksheetOption): Worksheet;
  addWorksheet (sheet: string, opts: WorksheetOption): Worksheet;
  addWorksheet (sheet: any, opts?: any): import('excel4node').Worksheet {
    return undefined
  }

  setSelectedTab (id: number): void {
    return undefined
  }

  createStyle (opts: Style): Style {
    return undefined
  }

  write (filename: string): void;
  write (filename: string, callback: (err: any, stats: Stats) => void): void;
  write (filename: any, callback?: any): void {
    return undefined
  }

  async writeToBuffer (): Promise<Buffer> {
    return undefined
  }
}
