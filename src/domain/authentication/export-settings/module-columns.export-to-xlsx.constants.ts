import { EntityColumnsToExportXLSXFileDTO } from '@/domain/common'

export const ModuleColumnsToExportXLSX: EntityColumnsToExportXLSXFileDTO = {
  id: {
    header: 'id',
    caption: 'Id',
    width: 20
  },
  name: {
    header: 'name',
    caption: 'Name',
    width: 50
  },
  description: {
    header: 'description',
    caption: 'Description',
    width: 50
  },
  module_key: {
    header: 'module_key',
    caption: 'Module key',
    width: 20
  },
  enabled: {
    header: 'enabled',
    caption: 'Enabled',
    width: 20
  },
  created_at: {
    header: 'created_at',
    caption: 'Created at'
  },
  updated_at: {
    header: 'updated_at',
    caption: 'Updated at'
  }
}
