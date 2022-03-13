import { ExportToCSVFileProtocol } from '@/protocols/csv'
import { ExcelJSAdapter } from './exceljs'

export class CSVFactory {
  public static getCSVAdapter (): ExportToCSVFileProtocol {
    return new ExcelJSAdapter()
  }
}
