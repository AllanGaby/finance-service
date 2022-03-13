import { ExportToCSVFileDTO, mockColumnToExportModel } from '@/protocols/csv'
import { system } from 'faker'

export const mockExportToCSVFileDTO = <DataType = object>(data: DataType[] = []): ExportToCSVFileDTO<DataType> => ({
  data,
  filePath: system.filePath(),
  columns: [
    mockColumnToExportModel(),
    mockColumnToExportModel(),
    mockColumnToExportModel(),
    mockColumnToExportModel()
  ]
})
