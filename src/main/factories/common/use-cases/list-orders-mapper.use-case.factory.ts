import { ListOrderMapperUseCase } from '@/domain/common'
import { MemoryListOrderMapperUseCase } from '@/data/common/use-cases'

export type ListOrderMapperUseCaseProps = {
  validRequestColumns: string[]
  validRepositoryOrders: string[]
}

export const makeListOrderMapperUseCase = ({ validRequestColumns, validRepositoryOrders }: ListOrderMapperUseCaseProps): ListOrderMapperUseCase =>
  new MemoryListOrderMapperUseCase(validRequestColumns, validRepositoryOrders)
