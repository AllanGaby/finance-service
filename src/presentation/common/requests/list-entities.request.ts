import { OrderDirection, CustomFilterConditional, CustomFilterOperator } from '@/domain/common'

export type ListEntitiesRequest = {
  search?: string
  page?: number
  size?: number
  order?: string
  direction?: OrderDirection
  f?: string | string[]
  o?: CustomFilterOperator | CustomFilterOperator[]
  c?: CustomFilterConditional | CustomFilterConditional[]
  v?: string | string[]
}
