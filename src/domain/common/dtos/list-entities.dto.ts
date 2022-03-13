import { OrderDirection, CustomFilterModel } from '@/domain/common'

export type ListEntitiesDTO = {
  textToSearch?: string
  recordsPerPage?: number
  page?: number
  orderColumn?: string
  orderDirection?: OrderDirection
  complete?: boolean
  filters?: CustomFilterModel[]
}
