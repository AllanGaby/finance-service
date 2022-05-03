import { CustomFilterMapperUseCase } from '@/domain/common'
import { MemoryCustomFilterMapperUseCase } from '@/data/common/use-cases'

export type CustomFilterMapperUseCaseProps = {
  validRequestColumns: string[]
  validRepositoryColumns: string[]
}

export const makeCustomFilterMapperUseCase = ({ validRequestColumns, validRepositoryColumns }: CustomFilterMapperUseCaseProps): CustomFilterMapperUseCase =>
  new MemoryCustomFilterMapperUseCase(validRequestColumns, validRepositoryColumns)
