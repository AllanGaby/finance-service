import { ListOrderMapperUseCase, ListOrderMapperDTO, ListOrderModel, mockListOrderModel } from '@/domain/common'

export class ListOrderMapperUseCaseSpy implements ListOrderMapperUseCase {
  params: ListOrderMapperDTO
  listOrder: ListOrderModel = mockListOrderModel()

  async getOrders (params: ListOrderMapperDTO): Promise<ListOrderModel> {
    this.params = params
    return this.listOrder
  }
}
