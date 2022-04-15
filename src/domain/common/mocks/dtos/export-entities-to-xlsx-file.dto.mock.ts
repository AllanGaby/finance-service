import { ExportEntitiesToXLSXFileDTO } from '@/domain/common'
import { database } from 'faker'

export const mockExportEntitiesToXLSXFileDTO = <DataType>(data: DataType[]): ExportEntitiesToXLSXFileDTO<DataType> => ({
  data,
  columns: [
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ]
})
