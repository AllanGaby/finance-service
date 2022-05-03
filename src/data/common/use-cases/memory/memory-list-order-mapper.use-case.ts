import { ListOrderMapperUseCase, ListOrderMapperDTO, ListOrderModel, OrderDirection } from '@/domain/common'

export class MemoryListOrderMapperUseCase implements ListOrderMapperUseCase {
  constructor (
    private readonly validParamsColumns: string[],
    private readonly validRepositoryColumns: string[]
  ) { }

  getDirection (directions: OrderDirection[], index: number): OrderDirection {
    if ((directions) && (directions.length > 0) && (directions.length >= index)) {
      return directions[index] || OrderDirection.ASC
    }
    return OrderDirection.ASC
  }

  async getOrders ({ order, direction }: ListOrderMapperDTO): Promise<ListOrderModel> {
    const listOrder: ListOrderModel = {}
    order?.forEach((field, index) => {
      if (this.validParamsColumns.includes(field)) {
        const repositoryField = this.validRepositoryColumns[this.validParamsColumns.indexOf(field)]
        listOrder[repositoryField] = this.getDirection(direction, index)
      }
    })
    return listOrder
  }
}
