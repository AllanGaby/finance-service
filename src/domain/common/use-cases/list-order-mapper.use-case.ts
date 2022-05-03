import { ListOrderMapperDTO, ListOrderModel } from '@/domain/common'

export interface ListOrderMapperUseCase {
  getOrders: (params: ListOrderMapperDTO) => Promise<ListOrderModel>
}
