import { EntityColumnsToExportXLSXFileDTO } from '@/domain/common'

export const ModuleAccessRuleColumnsToExportXLSX: EntityColumnsToExportXLSXFileDTO = {
  id: {
    header: 'id',
    caption: 'Id',
    width: 20
  },
  title: {
    header: 'title',
    caption: 'Title',
    width: 50
  },
  description: {
    header: 'description',
    caption: 'Description',
    width: 50
  },
  rule_key: {
    header: 'rule_key',
    caption: 'Rule key',
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
