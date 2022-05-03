import { CustomFilterConditional, CustomFilterOperator } from '@/domain/common'

export type CustomFilterMapperDTO = {
  fields: string[]
  operators: CustomFilterOperator[]
  values: string[]
  conditionals: CustomFilterConditional[]
}
