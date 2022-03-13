import { ExportToCSVFileDTO } from '@/protocols/csv'

export interface ExportToCSVFileProtocol {
  exportToCSV: <DataType = object>(params: ExportToCSVFileDTO<DataType>) => Promise<ArrayBuffer>
}
