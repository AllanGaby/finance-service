import { EntityToExportCSVFileModel } from '@/domain/common'

export const EntityToExportConstants: EntityToExportCSVFileModel = {
  id: {
    header: 'Identificador',
    key: 'id',
    width: 100
  },
  created_at: {
    header: 'Data de criação',
    key: 'created_at',
    width: 100
  },
  updated_at: {
    header: 'Última atualização',
    key: 'updated_at',
    width: 100
  }
}
