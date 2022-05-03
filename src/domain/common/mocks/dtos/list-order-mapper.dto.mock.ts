import { mockOrderDirection, OrderDirection, ListOrderMapperDTO } from '@/domain/common'
import { database } from 'faker'

export const mockListOrderMapperDTO = (columns: string[] = [
  database.column(),
  database.column(),
  database.column(),
  database.column()
]): ListOrderMapperDTO => ({
  order: columns,
  direction: columns.map<OrderDirection>(item => mockOrderDirection())
})
