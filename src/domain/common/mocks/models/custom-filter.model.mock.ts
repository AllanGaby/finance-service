import { CustomFilterModel, mockCustomFilterOperator, mockCustomFilterConditional } from '@/domain/common'
import { datatype } from 'faker'

export const mockCustomFilterModel = (): CustomFilterModel => ({
  field: datatype.uuid(),
  value: datatype.uuid(),
  conditional: mockCustomFilterConditional(),
  operator: mockCustomFilterOperator()
})
