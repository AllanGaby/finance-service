import { EntityColumnsToExportXLSXFileDTO } from '@/domain/common'

export const AccessProfileColumnsToExportXLSX: EntityColumnsToExportXLSXFileDTO = {
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
  enabled: {
    header: 'enabled',
    caption: 'Enabled',
    width: 20
  },
  access_profile_key: {
    header: 'access_profile_key',
    caption: 'Access profile key',
    width: 20
  },
  module_key: {
    header: 'module_key',
    caption: 'Module key',
    width: 20
  },
  module_name: {
    header: 'module_name',
    caption: 'Module name',
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
