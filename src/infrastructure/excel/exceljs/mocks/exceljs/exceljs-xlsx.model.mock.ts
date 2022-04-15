import { Buffer, Workbook, Xlsx, XlsxWriteOptions } from 'exceljs'
import { Stream } from 'stream'

export class ExcelJSXLSXSpy implements Xlsx {
  async readFile (path: string): Promise<Workbook> {
    return undefined
  }

  async read (stream: Stream): Promise<Workbook> {
    return undefined
  }

  async load (buffer: Buffer): Promise<Workbook> {
    return undefined
  }

  async writeBuffer (options?: Partial<XlsxWriteOptions>): Promise<Buffer> {
    return undefined
  }

  async writeFile (path: string, options?: Partial<XlsxWriteOptions>): Promise<void> {
    return undefined
  }

  async write (stream: Stream, options?: Partial<XlsxWriteOptions>): Promise<void> {
    return undefined
  }
}
