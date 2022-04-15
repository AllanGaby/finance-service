import { mockOrderDirection, mockCustomFilterConditional, mockCustomFilterOperator, mockCustomFilterModel } from '@/domain/common'
import { ListEntitiesRequest, CustomFiltersRequest } from '@/presentation/common'
import { HttpRequest } from '@/protocols/http'
import { datatype, database } from 'faker'

export const mockListEntitiesRequest = (): HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest> => ({
  body: {
    custom_filters: [
      mockCustomFilterModel(),
      mockCustomFilterModel(),
      mockCustomFilterModel(),
      mockCustomFilterModel()
    ]
  },
  queryParams: {
    page: datatype.number(),
    search: datatype.string(),
    size: datatype.number(),
    order: database.column(),
    direction: mockOrderDirection(),
    field: [
      database.column(),
      database.column()
    ],
    value: [
      datatype.uuid(),
      datatype.uuid()
    ],
    operator: [
      mockCustomFilterOperator(),
      mockCustomFilterOperator()
    ],
    conditional: [
      mockCustomFilterConditional(),
      mockCustomFilterConditional()
    ]
  }
})
