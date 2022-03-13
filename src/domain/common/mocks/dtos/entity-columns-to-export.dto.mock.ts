import { EntityColumnsToExportCSVFileDTO } from '@/domain/common'
import { mockColumnToExportModel } from '@/protocols/csv'
import { database } from 'faker'

export const mockEntityColumnsToExportCSVFileDTO = (): EntityColumnsToExportCSVFileDTO => ({
  [database.column()]: mockColumnToExportModel(),
  [database.column()]: mockColumnToExportModel(),
  [database.column()]: mockColumnToExportModel(),
  [database.column()]: mockColumnToExportModel()
})
