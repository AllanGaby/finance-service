import { mockOrderDirection, mockCustomFilterConditional, mockCustomFilterOperator, mockCustomFilterModel } from '@/domain/common'
import { CustomFiltersRequest, ExportEntitiesToFileRequest, ListEntitiesRequest } from '@/presentation/common'
import { HttpRequest } from '@/protocols/http'
import { datatype, database } from 'faker'

export const mockExportEntitiesToFileRequest = (): HttpRequest<CustomFiltersRequest, any, ListEntitiesRequest, ExportEntitiesToFileRequest> => ({
  body: {
    custom_filters: [
      mockCustomFilterModel(),
      mockCustomFilterModel(),
      mockCustomFilterModel(),
      mockCustomFilterModel()
    ]
  },
  params: {
    columns: [
      database.column(),
      database.column(),
      database.column(),
      database.column(),
      database.column()
    ].join(',')
  },
  queryParams: {
    page: datatype.number(),
    search: datatype.string(),
    size: datatype.number(),
    order: [
      database.column(),
      database.column(),
      database.column()
    ],
    direction: [
      mockOrderDirection(),
      mockOrderDirection(),
      mockOrderDirection()
    ],
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
