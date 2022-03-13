import { ColumnToExportModel } from '@/protocols/csv'
import { database, datatype } from 'faker'

export const mockColumnToExportModel = (): ColumnToExportModel => ({
  header: database.column(),
  key: datatype.uuid(),
  width: datatype.number(1000)
})
