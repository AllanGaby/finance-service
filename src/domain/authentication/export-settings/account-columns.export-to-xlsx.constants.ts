import { EntityColumnsToExportXLSXFileDTO } from '@/domain/common'

export const AccountColumnsToExportXLSX: EntityColumnsToExportXLSXFileDTO = {
  id: {
    header: 'id',
    caption: 'Id',
    width: 20
  },
  name: {
    header: 'name',
    caption: 'Name',
    width: 30
  },
  email: {
    header: 'email',
    caption: 'E-mail',
    width: 30
  },
  identification: {
    header: 'identification',
    caption: 'Identification',
    width: 30
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
