import { GetCustomFilterUseCase } from '@/domain/common'
import { MemoryGetCustomFilterUseCase } from '@/data/common/use-cases'

export type GetCustomFilterUseCaseProps = {
  validParamsColumns: string[]
  validRepositoryColumns: string[]
}

export const makeGetCustomFilterUseCase = ({ validParamsColumns, validRepositoryColumns }: GetCustomFilterUseCaseProps): GetCustomFilterUseCase => {
  return new MemoryGetCustomFilterUseCase(validParamsColumns, validRepositoryColumns)
}
