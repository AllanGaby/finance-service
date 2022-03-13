import { ListEntitiesRepositoryDTO } from '@/protocols/repositories'
import { mockOrderDirection } from '@/domain/common'
import { datatype, database } from 'faker'

export const mockListEntitiesRepositoryDTO = (): ListEntitiesRepositoryDTO => ({
  recordsPerPage: datatype.number(),
  textToSearch: datatype.string(),
  skip: datatype.number(),
  orderDirection: mockOrderDirection(),
  orderColumn: database.column()
})
