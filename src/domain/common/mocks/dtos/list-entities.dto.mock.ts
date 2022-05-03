import { ListEntitiesDTO, mockCustomFilterModel, mockListOrderModel } from '@/domain/common'
import { datatype } from 'faker'

export const mockListEntitiesDTO = (): ListEntitiesDTO => ({
  textToSearch: datatype.string(),
  order: mockListOrderModel(),
  page: datatype.number(),
  complete: datatype.boolean(),
  recordsPerPage: datatype.number(),
  filters: [
    mockCustomFilterModel(),
    mockCustomFilterModel()
  ]
})
