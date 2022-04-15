import { ExportEntitiesToCSVFileDTO } from '@/domain/common'
import { database } from 'faker'

export const mockExportEntitiesToCSVFileDTO = <DataType>(data: DataType[]): ExportEntitiesToCSVFileDTO<DataType> => ({
  data,
  columns: [
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ]
})
