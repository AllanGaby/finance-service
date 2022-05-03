import { ListEntitiesRepositoryDTO } from '@/protocols/repositories'
import { mockCustomFilterModel, mockListOrderModel } from '@/domain/common'
import { datatype } from 'faker'

export const mockListEntitiesRepositoryDTO = (): ListEntitiesRepositoryDTO => ({
  recordsPerPage: datatype.number(),
  textToSearch: datatype.string(),
  skip: datatype.number(),
  order: mockListOrderModel(),
  filters: [
    mockCustomFilterModel(),
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]
})
