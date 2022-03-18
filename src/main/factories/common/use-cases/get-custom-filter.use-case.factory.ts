import { MapperCustomFilterUseCase } from '@/domain/common'
import { MemoryMapperCustomFilterUseCase } from '@/data/common/use-cases'

export type MapperCustomFilterUseCaseProps = {
  validRequestColumns: string[]
  validRepositoryColumns: string[]
}

export const makeMapperCustomFilterUseCase = ({ validRequestColumns, validRepositoryColumns }: MapperCustomFilterUseCaseProps): MapperCustomFilterUseCase => {
  return new MemoryMapperCustomFilterUseCase(validRequestColumns, validRepositoryColumns)
}
