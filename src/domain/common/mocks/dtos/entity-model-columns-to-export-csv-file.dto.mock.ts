import { EntityColumnsToExportCSVFileDTO, mockEntityModel } from '@/domain/common'
import { mockColumnToExportModel } from '@/protocols/csv'

export const mockEntityModelColumnsToExportDTO = (): EntityColumnsToExportCSVFileDTO => {
  const entity = mockEntityModel()
  const columns = Object.keys(entity)
  const entityColumns: EntityColumnsToExportCSVFileDTO = {}
  columns.forEach(field => {
    entityColumns[field] = mockColumnToExportModel()
    entityColumns[field].key = field
  })
  return entityColumns
}
