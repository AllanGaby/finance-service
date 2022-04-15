import { EntityColumnsToExportXLSXFileDTO, mockEntityModel } from '@/domain/common'
import { mockExcelColumnHeaderModel } from '@/protocols/excel'

export const mockEntityModelColumnsToExportXLSXFileDTO = (): EntityColumnsToExportXLSXFileDTO => {
  const entity = mockEntityModel()
  const columns = Object.keys(entity)
  const entityColumns: EntityColumnsToExportXLSXFileDTO = {}
  columns.forEach(field => {
    entityColumns[field] = mockExcelColumnHeaderModel()
    entityColumns[field].header = field
  })
  return entityColumns
}
