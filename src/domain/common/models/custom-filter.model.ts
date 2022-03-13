import { CustomFilterOperator, CustomFilterConditional } from '@/domain/common'

export type CustomFilterModel = {
  field: string
  value?: string | number | string[] | number[]
  conditional: CustomFilterConditional
  operator?: CustomFilterOperator
}
