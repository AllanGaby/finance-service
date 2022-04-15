import {
  ReadFileContentByBufferProtocol,
  SaveToBufferProtocol,
  SaveToFileProtocol,
  SetWorksheetDataProtocol
} from '@/protocols/excel'
import { ExcelJSAdapter } from './exceljs'
import { XlsxAdapter } from './xlsx'

export type ExcelWriteProtocols =
 SaveToBufferProtocol
 & SaveToFileProtocol
 & SetWorksheetDataProtocol

export type ExcelReadProtocols =
ReadFileContentByBufferProtocol

export class ExcelFactory {
  public static GetExcelWriteAdapter<AdapterType extends ExcelWriteProtocols>(): ExcelWriteProtocols {
    return new ExcelJSAdapter() as unknown as AdapterType
  }

  public static GetExcelReadAdapter<AdapterType extends ExcelReadProtocols>(): ExcelReadProtocols {
    return new XlsxAdapter() as AdapterType
  }
}
