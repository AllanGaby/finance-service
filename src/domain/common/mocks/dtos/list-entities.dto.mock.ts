import { ListEntitiesDTO, mockOrderDirection, mockCustomFilterModel } from '@/domain/common'
import { database, datatype } from 'faker'

export const mockListEntitiesDTO = (): ListEntitiesDTO => ({
  textToSearch: datatype.string(),
  orderColumn: database.column(),
  orderDirection: mockOrderDirection(),
  page: datatype.number(),
  complete: datatype.boolean(),
  recordsPerPage: datatype.number(),
  filters: [
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]
})
