import { ListEntitiesAndExportToFileDTO, mockListEntitiesDTO } from '@/domain/common'
import { database } from 'faker'

export const mockListEntitiesAndExportToFileDTO = (): ListEntitiesAndExportToFileDTO => ({
  ...mockListEntitiesDTO(),
  columns: [
    database.column(),
    database.column(),
    database.column(),
    database.column(),
    database.column()
  ]
})
