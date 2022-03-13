import { ExportToCSVFileProtocol, ExportToCSVFileDTO } from '@/protocols/csv'
import { Workbook } from 'exceljs'

export class ExcelJSAdapter implements ExportToCSVFileProtocol {
  workbook: Workbook
  constructor () {
    this.workbook = new Workbook()
  }

  private createDefaultSheet <DataType = object>({ columns, data }: ExportToCSVFileDTO<DataType>): void {
    this.workbook.removeWorksheet('default')
    const sheet = this.workbook.addWorksheet('default')
    if (columns) {
      sheet.columns = columns
    }
    sheet.addRows(data)
  }

  async exportToCSV <DataType = object>(params: ExportToCSVFileDTO<DataType>): Promise<ArrayBuffer> {
    this.createDefaultSheet(params)
    return this.workbook.csv.writeBuffer({
      encoding: 'utf-8',
      includeEmptyRows: false
    })
  }
}
