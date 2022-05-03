import { CustomFilterModel, ListOrderModel } from '@/domain/common'

export type ListEntitiesRepositoryDTO = {
  textToSearch?: string
  recordsPerPage?: number
  skip?: number
  order?: ListOrderModel
  filters?: CustomFilterModel[]
}
