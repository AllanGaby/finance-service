import { CustomFilterModel, ListOrderModel } from '@/domain/common'

export type ListEntitiesDTO = {
  textToSearch?: string
  recordsPerPage?: number
  page?: number
  order?: ListOrderModel
  complete?: boolean
  filters?: CustomFilterModel[]
}
