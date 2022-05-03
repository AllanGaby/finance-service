import { OrderDirection } from '@/domain/common'

export type ListOrderMapperDTO = {
  order: string[]
  direction?: OrderDirection[]
}
