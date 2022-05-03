import { OrderDirection } from '@/domain/common'

export type ListOrderModel = {
  [column: string]: OrderDirection
}
