import { CustomFilterModel, CustomFilterConditional, CustomFilterOperator } from '@/domain/common'

export type GetCustomFilterDTO = {
  f: string[]
  o: CustomFilterOperator[]
  v: string[]
  c: CustomFilterConditional[]
}

export interface GetCustomFilterUseCase {
  getFilter: (params: GetCustomFilterDTO) => Promise<CustomFilterModel[]>
}
