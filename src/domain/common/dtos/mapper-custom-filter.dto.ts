import { CustomFilterConditional, CustomFilterOperator } from '@/domain/common'

export type MapperCustomFilterDTO = {
  fields: string[]
  operators: CustomFilterOperator[]
  values: string[]
  conditionals: CustomFilterConditional[]
}
