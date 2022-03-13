import { OrderDirection, CustomFilterModel } from '@/domain/common'

export type ListEntitiesRepositoryDTO = {
  textToSearch?: string
  recordsPerPage?: number
  skip?: number
  orderColumn?: string
  orderDirection?: OrderDirection
  filters?: CustomFilterModel[]
}
