import { mockOrderDirection, ListOrderModel } from '@/domain/common'
import { database } from 'faker'

export const mockListOrderModel = (): ListOrderModel => ({
  [database.column()]: mockOrderDirection(),
  [database.column()]: mockOrderDirection(),
  [database.column()]: mockOrderDirection(),
  [database.column()]: mockOrderDirection()
})
