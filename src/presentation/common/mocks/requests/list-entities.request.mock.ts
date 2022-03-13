import { mockOrderDirection, mockCustomFilterConditional, mockCustomFilterOperator } from '@/domain/common'
import { ListEntitiesRequest } from '@/presentation/common/requests'
import { HttpRequest } from '@/protocols/http'
import { datatype, database } from 'faker'

export const mockListEntitiesRequest = (): HttpRequest<any, any, ListEntitiesRequest> => ({
  queryParams: {
    page: datatype.number(),
    search: datatype.string(),
    size: datatype.number(),
    order: database.column(),
    direction: mockOrderDirection(),
    f: [
      database.column(),
      database.column()
    ],
    v: [
      datatype.uuid(),
      datatype.uuid()
    ],
    o: [
      mockCustomFilterOperator(),
      mockCustomFilterOperator()
    ],
    c: [
      mockCustomFilterConditional(),
      mockCustomFilterConditional()
    ]
  }
})
