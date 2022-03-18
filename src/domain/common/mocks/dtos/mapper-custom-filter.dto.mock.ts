import { MapperCustomFilterDTO, CustomFilterConditional, mockCustomFilterConditional, CustomFilterOperator, mockCustomFilterOperator } from '@/domain/common'
import { database, datatype } from 'faker'

export const mockMapperCustomFilterDTO = (filterLength: number = datatype.number({ min: 1, max: 10 })): MapperCustomFilterDTO => {
  const fields: string[] = []
  const values: string[] = []
  const operators: CustomFilterOperator[] = []
  const conditionals: CustomFilterConditional[] = []

  for (let index = 1; index <= filterLength; index++) {
    fields.push(database.column())
    values.push(datatype.uuid())
    operators.push(mockCustomFilterOperator())
    conditionals.push(mockCustomFilterConditional())
  }
  return {
    fields,
    values,
    operators,
    conditionals
  }
}
