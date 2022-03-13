import { ColumnToExportModel } from '@/protocols/csv'

export type ExportToCSVFileDTO<DataType = object> = {
  data: DataType[]
  filePath: string
  columns?: ColumnToExportModel[]
}
