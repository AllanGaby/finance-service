import { CustomFilterModel, ListOrderModel } from '@/domain/common'

export type CustomFiltersRequest = {
  orders?: ListOrderModel
  custom_filters: CustomFilterModel[]
}
