import { OrderDirection, CustomFilterConditional, CustomFilterOperator } from '@/domain/common'

export type ListEntitiesRequest = {
  search?: string
  page?: number
  size?: number
  order?: string | string[]
  direction?: OrderDirection | OrderDirection[]
  field?: string | string[]
  operator?: CustomFilterOperator | CustomFilterOperator[]
  conditional?: CustomFilterConditional | CustomFilterConditional[]
  value?: string | string[]
}
